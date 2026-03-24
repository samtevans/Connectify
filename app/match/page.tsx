"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
} from "lucide-react";
import { SERVICE_LABELS, type ServiceId } from "@/lib/accountants";
import { findBestMatch, type MatchAnswers } from "@/lib/matching";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  "Where is your business based?",
  "How would you prefer to meet?",
  "What type of business do you run?",
  "What do you need help with?",
  "What's your annual turnover?",
  "How would you prefer to pay?",
  "Is Welsh language service important?",
  "How soon do you need an accountant?",
];

const SERVICES: { id: ServiceId; emoji: string }[] = [
  { id: "tax-returns", emoji: "📋" },
  { id: "bookkeeping", emoji: "📒" },
  { id: "payroll", emoji: "💰" },
  { id: "vat-returns", emoji: "🧾" },
  { id: "year-end-accounts", emoji: "📊" },
  { id: "rd-tax-credits", emoji: "🔬" },
  { id: "management-accounts", emoji: "📈" },
  { id: "company-secretarial", emoji: "📁" },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function RadioCard({
  selected,
  onClick,
  label,
  desc,
  emoji,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
  emoji?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1 ${
        selected
          ? "border-brand-500 bg-brand-50 shadow-sm"
          : "border-cream-300 bg-cream-50 hover:border-brand-300 hover:bg-brand-50/40"
      }`}
    >
      <div className="flex items-center gap-3">
        {emoji && <span className="text-2xl leading-none">{emoji}</span>}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900 text-sm sm:text-base">
            {label}
          </div>
          {desc && (
            <div className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
              {desc}
            </div>
          )}
        </div>
        <div
          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected ? "border-brand-500 bg-brand-500" : "border-slate-300"
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>
    </button>
  );
}

function CheckCard({
  selected,
  onClick,
  label,
  emoji,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  emoji?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1 ${
        selected
          ? "border-brand-500 bg-brand-50 shadow-sm"
          : "border-cream-300 bg-cream-50 hover:border-brand-300 hover:bg-brand-50/40"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {emoji && <span className="text-lg leading-none">{emoji}</span>}
        <span className="flex-1 font-medium text-slate-800 text-sm">{label}</span>
        <div
          className={`shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors ${
            selected ? "bg-brand-500 border-0" : "border-2 border-slate-300"
          }`}
        >
          {selected && <CheckCircle2 size={14} className="text-white" />}
        </div>
      </div>
    </button>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

export default function MatchPage() {
  const router = useRouter();

  // Step
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Answers
  const [postcode, setPostcode] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [meetingPref, setMeetingPref] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [services, setServices] = useState<ServiceId[]>([]);
  const [turnoverRange, setTurnoverRange] = useState("");
  const [feePref, setFeePref] = useState("");
  const [welshLang, setWelshLang] = useState("");
  const [urgency, setUrgency] = useState("");

  // Postcode lookup loading state
  const [postcodeLoading, setPostcodeLoading] = useState(false);

  // ── Validation ─────────────────────────────────────────────────────────────
  function canAdvance(): boolean {
    switch (step) {
      case 1: return postcode.trim().length >= 5;
      case 2: return !!meetingPref;
      case 3: return !!businessType;
      case 4: return services.length > 0;
      case 5: return !!turnoverRange;
      case 6: return !!feePref;
      case 7: return !!welshLang;
      case 8: return !!urgency;
      default: return false;
    }
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  async function handleNext() {
    setError("");

    // Step 1: resolve postcode before advancing
    if (step === 1) {
      setPostcodeLoading(true);
      try {
        const clean = postcode.trim().replace(/\s+/g, "").toUpperCase();
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`
        );
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        setCoordinates({
          lat: data.result.latitude,
          lng: data.result.longitude,
        });
        setStep((s) => s + 1);
      } catch {
        setError(
          "We couldn't find that postcode. Please check it and try again."
        );
      } finally {
        setPostcodeLoading(false);
      }
      return;
    }

    // Final step: run matching and navigate
    if (step === TOTAL_STEPS) {
      setIsSubmitting(true);
      const answers: MatchAnswers = {
        postcode,
        coordinates,
        meetingPreference: meetingPref as MatchAnswers["meetingPreference"],
        businessType: businessType as MatchAnswers["businessType"],
        servicesNeeded: services,
        turnoverRange: turnoverRange as MatchAnswers["turnoverRange"],
        feePreference: feePref as MatchAnswers["feePreference"],
        welshLanguage: welshLang as MatchAnswers["welshLanguage"],
        urgency: urgency as MatchAnswers["urgency"],
      };

      const result = findBestMatch(answers);
      sessionStorage.setItem("connectify_match_result", JSON.stringify(result));
      sessionStorage.setItem("connectify_match_answers", JSON.stringify(answers));

      if (result) {
        router.push("/match/results");
      } else {
        router.push("/match/no-match");
      }
      return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  }

  function toggleService(id: ServiceId) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  // ─── Step renderers ─────────────────────────────────────────────────────────

  function renderStep() {
    switch (step) {
      // ── Step 1: Postcode ─────────────────────────────────────────────────
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canAdvance()) handleNext();
                }}
                placeholder="e.g. CF10 1EP"
                className="input-field pl-11 text-lg uppercase tracking-widest"
                autoComplete="postal-code"
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              We use this only to calculate distance — your postcode is never shared.
            </p>
          </div>
        );

      // ── Step 2: Meeting preference ───────────────────────────────────────
      case 2:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "in-person",
                label: "In person",
                desc: "I prefer face-to-face meetings at their office or mine",
                emoji: "🤝",
              },
              {
                value: "remote",
                label: "Fully remote",
                desc: "Video calls and email work perfectly for me",
                emoji: "💻",
              },
              {
                value: "no-preference",
                label: "No preference",
                desc: "Either works — I'm flexible",
                emoji: "✨",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={meetingPref === opt.value}
                onClick={() => setMeetingPref(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      // ── Step 3: Business type ────────────────────────────────────────────
      case 3:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "sole-trader",
                label: "Sole trader",
                desc: "Self-employed, trading under my own name or a business name",
                emoji: "🧑‍💼",
              },
              {
                value: "limited-company",
                label: "Limited company",
                desc: "Incorporated — I'm a director",
                emoji: "🏢",
              },
              {
                value: "partnership",
                label: "Partnership",
                desc: "Two or more partners running the business together",
                emoji: "🤲",
              },
              {
                value: "startup",
                label: "Start-up",
                desc: "Early-stage — still finding my feet",
                emoji: "🚀",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={businessType === opt.value}
                onClick={() => setBusinessType(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      // ── Step 4: Services (multi-select) ──────────────────────────────────
      case 4:
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500 text-center mb-1">
              Select all that apply
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES.map(({ id, emoji }) => (
                <CheckCard
                  key={id}
                  selected={services.includes(id)}
                  onClick={() => toggleService(id)}
                  label={SERVICE_LABELS[id]}
                  emoji={emoji}
                />
              ))}
            </div>
            {services.length > 0 && (
              <p className="text-xs text-brand-600 font-medium text-center mt-1">
                {services.length} selected
              </p>
            )}
          </div>
        );

      // ── Step 5: Turnover ─────────────────────────────────────────────────
      case 5:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "under-50k",
                label: "Under £50k",
                desc: "Early stage or small-scale trading",
                emoji: "🌱",
              },
              {
                value: "50k-250k",
                label: "£50k – £250k",
                desc: "Growing business with steady revenue",
                emoji: "📈",
              },
              {
                value: "250k-1m",
                label: "£250k – £1m",
                desc: "Established, scaling business",
                emoji: "🏆",
              },
              {
                value: "over-1m",
                label: "Over £1m",
                desc: "Larger business with complex needs",
                emoji: "🏦",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={turnoverRange === opt.value}
                onClick={() => setTurnoverRange(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      // ── Step 6: Fee preference ───────────────────────────────────────────
      case 6:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "fixed-monthly",
                label: "Fixed monthly fee",
                desc: "I want predictable costs — one number, every month",
                emoji: "📅",
              },
              {
                value: "pay-per-service",
                label: "Pay per service",
                desc: "I'd rather pay for what I need, when I need it",
                emoji: "🧾",
              },
              {
                value: "no-preference",
                label: "No preference",
                desc: "Open to whatever makes sense",
                emoji: "🤷",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={feePref === opt.value}
                onClick={() => setFeePref(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      // ── Step 7: Welsh language ───────────────────────────────────────────
      case 7:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "yes",
                label: "Yes — Welsh is important to me",
                desc: "I want to conduct my accounting in Welsh",
                emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
              },
              {
                value: "no",
                label: "No — English is fine",
                desc: "Language isn't a factor",
                emoji: "🇬🇧",
              },
              {
                value: "no-preference",
                label: "No preference",
                desc: "Either works for me",
                emoji: "👌",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={welshLang === opt.value}
                onClick={() => setWelshLang(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      // ── Step 8: Urgency ──────────────────────────────────────────────────
      case 8:
        return (
          <div className="flex flex-col gap-3">
            {[
              {
                value: "immediately",
                label: "As soon as possible",
                desc: "I need someone in the next week or two",
                emoji: "⚡",
              },
              {
                value: "within-a-month",
                label: "Within the next month",
                desc: "I'm actively looking but not in a rush",
                emoji: "📆",
              },
              {
                value: "just-exploring",
                label: "Just exploring",
                desc: "No pressure — I'm seeing what's out there",
                emoji: "🔍",
              },
            ].map((opt) => (
              <RadioCard
                key={opt.value}
                selected={urgency === opt.value}
                onClick={() => setUrgency(opt.value)}
                label={opt.label}
                desc={opt.desc}
                emoji={opt.emoji}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  // ─── Layout ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-cream-50 border-b border-cream-300 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="9" cy="9" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-sm">Connectify</span>
        </Link>

        <span className="text-sm text-slate-500 font-medium">
          Question {step} of {TOTAL_STEPS}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-cream-300 shrink-0">
        <div
          className="h-full bg-brand-500 transition-all duration-500 ease-out"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Question header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 border border-brand-200 text-brand-700 font-bold text-sm mb-4">
              {step}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {STEP_TITLES[step - 1]}
            </h1>
          </div>

          {/* Step content */}
          <div className="mb-6">{renderStep()}</div>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn-ghost border border-cream-300"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance() || postcodeLoading || isSubmitting}
              className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {postcodeLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Looking up postcode…
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Finding your match…
                </>
              ) : step === TOTAL_STEPS ? (
                <>
                  Find my accountant
                  <CheckCircle2 size={16} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === step
                    ? "w-6 bg-brand-500"
                    : i + 1 < step
                    ? "w-1.5 bg-brand-300"
                    : "w-1.5 bg-cream-300"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
