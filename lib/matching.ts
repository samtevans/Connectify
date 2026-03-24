import {
  accountants,
  type Accountant,
  type ServiceId,
  type BusinessType,
  type TurnoverRange,
  type MeetingPreference,
  type FeeStructure,
  SERVICE_LABELS,
  BUSINESS_TYPE_LABELS,
  TURNOVER_LABELS,
  MEETING_LABELS,
} from "./accountants";

// ─── Questionnaire answer types ───────────────────────────────────────────────

export interface MatchAnswers {
  postcode: string;
  coordinates: { lat: number; lng: number } | null;
  meetingPreference: MeetingPreference;
  businessType: BusinessType;
  servicesNeeded: ServiceId[];
  turnoverRange: TurnoverRange;
  feePreference: FeeStructure;
  welshLanguage: "yes" | "no" | "no-preference";
  urgency: "immediately" | "within-a-month" | "just-exploring";
  freeText?: string;
}

export interface ScoreBreakdown {
  location: number;           // max 12
  meetingPreference: number;  // max 9
  services: number;           // max 18
  businessType: number;       // max 15
  turnoverRange: number;      // max 12
  feePreference: number;      // max 5
  welshLanguage: number;      // max 4
  total: number;              // max 75 rule-based; + 25 AI = 100 grand total
}

export interface MatchResult {
  accountant: Accountant;
  breakdown: ScoreBreakdown;
  distanceMiles: number | null;
  coveragePercent: number;
}

export interface ExplanationItem {
  factor: string;
  earned: number;
  max: number;
  text: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Haversine distance in miles between two lat/lng points. */
function haversineMiles(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const TURNOVER_ORDER: TurnoverRange[] = [
  "under-50k",
  "50k-250k",
  "250k-1m",
  "over-1m",
];

/** Business types that count as "some experience" (8 pts) vs full specialism (15 pts). */
const RELATED_TYPES: Partial<Record<BusinessType, BusinessType[]>> = {
  startup: ["limited-company"],
  "limited-company": ["startup", "partnership"],
  partnership: ["sole-trader", "limited-company"],
  "sole-trader": ["partnership"],
};

// ─── Core scoring function ────────────────────────────────────────────────────

function scoreAccountant(
  accountant: Accountant,
  answers: MatchAnswers
): MatchResult {
  const b: Omit<ScoreBreakdown, "total"> = {
    location: 0,
    meetingPreference: 0,
    services: 0,
    businessType: 0,
    turnoverRange: 0,
    feePreference: 0,
    welshLanguage: 0,
  };

  let distanceMiles: number | null = null;

  // ── 1. Location (max 12) ──────────────────────────────────────────────────
  if (answers.meetingPreference === "remote") {
    b.location = 12;
  } else if (answers.coordinates) {
    distanceMiles = haversineMiles(
      answers.coordinates.lat, answers.coordinates.lng,
      accountant.coordinates.lat, accountant.coordinates.lng
    );
    if      (distanceMiles <= 5)  b.location = 12;
    else if (distanceMiles <= 10) b.location = 9;
    else if (distanceMiles <= 20) b.location = 6;
    else if (distanceMiles <= 30) b.location = 3;
    else if (distanceMiles <= 40) b.location = 1;
    else                          b.location = 0;
  } else {
    // postcodes.io lookup failed — neutral fallback
    b.location = 6;
  }

  // ── 2. Meeting preference (max 9) ────────────────────────────────────────
  const up = answers.meetingPreference;
  const ap = accountant.meetingPreference;
  if (
    (up === "in-person" && ap === "in-person") ||
    (up === "remote" && ap === "remote")
  ) {
    b.meetingPreference = 9;
  } else if (up === "no-preference" || ap === "no-preference") {
    b.meetingPreference = 5;
  } else {
    b.meetingPreference = 0;
  }

  // ── 3. Services (max 18) ─────────────────────────────────────────────────
  let coveragePercent = 0;
  const needed = answers.servicesNeeded;
  if (needed.length > 0) {
    const covered = needed.filter((s) => accountant.services.includes(s)).length;
    coveragePercent = covered / needed.length;
  }
  if      (coveragePercent >= 1)    b.services = 18;
  else if (coveragePercent >= 0.75) b.services = 14;
  else if (coveragePercent >= 0.5)  b.services = 9;
  else if (coveragePercent >= 0.25) b.services = 5;
  else                              b.services = 0;

  // ── 4. Business type (max 15) ────────────────────────────────────────────
  if (accountant.businessTypes.includes(answers.businessType)) {
    b.businessType = 15;
  } else {
    const related = RELATED_TYPES[answers.businessType] ?? [];
    if (accountant.businessTypes.some((t) => related.includes(t))) {
      b.businessType = 8;
    }
  }

  // ── 5. Turnover range (max 12) ───────────────────────────────────────────
  if (accountant.turnoverRanges.includes(answers.turnoverRange)) {
    b.turnoverRange = 12;
  } else {
    const idx = TURNOVER_ORDER.indexOf(answers.turnoverRange);
    const adjacent = [
      TURNOVER_ORDER[idx - 1],
      TURNOVER_ORDER[idx + 1],
    ].filter(Boolean) as TurnoverRange[];
    if (accountant.turnoverRanges.some((r) => adjacent.includes(r))) {
      b.turnoverRange = 6;
    }
  }

  // ── 6. Fee preference (max 5) ────────────────────────────────────────────
  if (answers.feePreference === accountant.feeStructure) {
    b.feePreference = 5;
  } else if (
    answers.feePreference === "no-preference" ||
    accountant.feeStructure === "no-preference"
  ) {
    b.feePreference = 3;
  }

  // ── 7. Welsh language (max 4) ────────────────────────────────────────────
  if (answers.welshLanguage === "yes" && accountant.welshSpeaker) {
    b.welshLanguage = 4;
  }

  const total =
    b.location +
    b.meetingPreference +
    b.services +
    b.businessType +
    b.turnoverRange +
    b.feePreference +
    b.welshLanguage;

  // Sanity-check: total cannot exceed 75
  const clampedTotal = Math.min(75, total);

  return {
    accountant,
    breakdown: { ...b, total: clampedTotal },
    distanceMiles,
    coveragePercent,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const MATCH_THRESHOLD = 20;

/** Returns the single highest-scoring accountant, or null if none clears the threshold. */
export function findBestMatch(answers: MatchAnswers): MatchResult | null {
  let candidates = accountants;

  // Disqualify in-person accountants over 40 miles
  if (answers.meetingPreference === "in-person" && answers.coordinates) {
    candidates = candidates.filter((a) => {
      const dist = haversineMiles(
        answers.coordinates!.lat, answers.coordinates!.lng,
        a.coordinates.lat, a.coordinates.lng
      );
      return dist <= 40;
    });
  }

  if (candidates.length === 0) return null;

  const scored = candidates
    .map((a) => scoreAccountant(a, answers))
    .sort((a, b) => b.breakdown.total - a.breakdown.total);

  const best = scored[0];
  if (!best || best.breakdown.total < MATCH_THRESHOLD) return null;
  return best;
}

// ─── Explanation generator ────────────────────────────────────────────────────

export function generateExplanations(
  result: MatchResult,
  answers: MatchAnswers
): ExplanationItem[] {
  const { accountant, breakdown, distanceMiles, coveragePercent } = result;
  const firstName = accountant.name.split(" ")[0];
  const items: ExplanationItem[] = [];

  // 1. Location
  if (answers.meetingPreference === "remote") {
    items.push({
      factor: "Location",
      earned: breakdown.location,
      max: 12,
      text: `You opted for a fully remote accountant, so distance isn't a factor — ${firstName} scored full marks here.`,
    });
  } else if (distanceMiles !== null) {
    const d = Math.round(distanceMiles);
    let text: string;
    if (d <= 5)
      text = `${firstName} is based in ${accountant.city}, just ${d} mile${d === 1 ? "" : "s"} from your postcode — right on your doorstep.`;
    else if (d <= 10)
      text = `${firstName} is based in ${accountant.city}, ${d} miles from you — a short local distance.`;
    else if (d <= 20)
      text = `${firstName} is based in ${accountant.city}, ${d} miles from you — a comfortable local distance.`;
    else if (d <= 30)
      text = `${firstName} is based in ${accountant.city}, ${d} miles from you — within reasonable travelling distance.`;
    else if (d <= 40)
      text = `${firstName} is based in ${accountant.city}, ${d} miles away — at the outer edge of practical travel distance.`;
    else
      text = `${firstName} is based in ${accountant.city}, ${d} miles away — distance is a factor here.`;
    items.push({ factor: "Location", earned: breakdown.location, max: 12, text });
  } else {
    items.push({
      factor: "Location",
      earned: breakdown.location,
      max: 12,
      text: `${firstName} is based in ${accountant.city}. We couldn't verify your postcode's exact coordinates, so a neutral score was applied.`,
    });
  }

  // 2. Meeting preference
  const prefLabel = MEETING_LABELS[accountant.meetingPreference].toLowerCase();
  if (breakdown.meetingPreference === 9) {
    items.push({
      factor: "How you'll meet",
      earned: 9,
      max: 9,
      text: `${firstName} works ${prefLabel} — exactly what you're looking for.`,
    });
  } else if (breakdown.meetingPreference === 5) {
    items.push({
      factor: "How you'll meet",
      earned: 5,
      max: 9,
      text: `${firstName} is flexible on how you meet, which works around your preference.`,
    });
  } else {
    items.push({
      factor: "How you'll meet",
      earned: 0,
      max: 9,
      text: `${firstName} generally prefers ${prefLabel} meetings, which differs from what you're looking for.`,
    });
  }

  // 3. Services
  const needed = answers.servicesNeeded;
  const coveredNames = needed
    .filter((s) => accountant.services.includes(s))
    .map((s) => SERVICE_LABELS[s]);
  const pct = Math.round(coveragePercent * 100);
  let serviceText: string;
  if (coveragePercent >= 1) {
    serviceText = `${firstName} covers all ${needed.length} of the services you need — a complete match.`;
  } else if (coveredNames.length > 0) {
    serviceText = `${firstName} covers ${coveredNames.length} of your ${needed.length} required services (${pct}%), including ${coveredNames.slice(0, 3).join(", ")}${coveredNames.length > 3 ? " and more" : ""}.`;
  } else {
    serviceText = `${firstName}'s service range has limited overlap with what you need — worth a conversation to confirm.`;
  }
  items.push({ factor: "Services covered", earned: breakdown.services, max: 18, text: serviceText });

  // 4. Business type
  const btLabel = BUSINESS_TYPE_LABELS[answers.businessType].toLowerCase();
  if (breakdown.businessType === 15) {
    items.push({
      factor: "Business type",
      earned: 15,
      max: 15,
      text: `${firstName} specialises in working with ${btLabel}s — exactly your business structure.`,
    });
  } else if (breakdown.businessType === 8) {
    items.push({
      factor: "Business type",
      earned: 8,
      max: 15,
      text: `${firstName} has experience with similar business structures to yours, even if your exact type isn't their primary specialism.`,
    });
  } else {
    items.push({
      factor: "Business type",
      earned: 0,
      max: 15,
      text: `${firstName} is less focused on ${btLabel}s specifically, though they may still be able to help — ask during your consultation.`,
    });
  }

  // 5. Turnover range
  const trLabel = TURNOVER_LABELS[answers.turnoverRange];
  if (breakdown.turnoverRange === 12) {
    items.push({
      factor: "Turnover range",
      earned: 12,
      max: 12,
      text: `${firstName} regularly works with businesses in your turnover range (${trLabel}).`,
    });
  } else if (breakdown.turnoverRange === 6) {
    items.push({
      factor: "Turnover range",
      earned: 6,
      max: 12,
      text: `${firstName} typically works with businesses in an adjacent turnover bracket — your size is within range.`,
    });
  } else {
    items.push({
      factor: "Turnover range",
      earned: 0,
      max: 12,
      text: `${firstName} usually works with businesses outside your current turnover range, which may affect the level of service offered.`,
    });
  }

  // 6. Fee preference
  if (breakdown.feePreference === 5) {
    items.push({
      factor: "Fee structure",
      earned: 5,
      max: 5,
      text: `${firstName} offers a ${accountant.feeStructure === "fixed-monthly" ? "fixed monthly fee" : "pay-per-service arrangement"} — exactly what you're looking for.`,
    });
  } else if (breakdown.feePreference === 3) {
    items.push({
      factor: "Fee structure",
      earned: 3,
      max: 5,
      text: `${firstName} has flexibility on fee arrangements, which can work around your preference.`,
    });
  } else {
    items.push({
      factor: "Fee structure",
      earned: 0,
      max: 5,
      text: `${firstName}'s standard fee structure differs from your preference, but it's always worth discussing alternatives.`,
    });
  }

  // 7. Welsh language (only shown if user requested it)
  if (answers.welshLanguage === "yes") {
    if (breakdown.welshLanguage === 4) {
      items.push({
        factor: "Welsh language",
        earned: 4,
        max: 4,
        text: `${firstName} is a Welsh speaker — you noted this as important, and it's a great fit.`,
      });
    } else {
      items.push({
        factor: "Welsh language",
        earned: 0,
        max: 4,
        text: `${firstName} doesn't offer Welsh-language services, which you indicated was a preference.`,
      });
    }
  }

  return items;
}
