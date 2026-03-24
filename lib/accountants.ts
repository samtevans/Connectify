// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceId =
  | "tax-returns"
  | "bookkeeping"
  | "payroll"
  | "vat-returns"
  | "year-end-accounts"
  | "rd-tax-credits"
  | "management-accounts"
  | "company-secretarial";

export type BusinessType =
  | "sole-trader"
  | "limited-company"
  | "partnership"
  | "startup";

export type TurnoverRange =
  | "under-50k"
  | "50k-250k"
  | "250k-1m"
  | "over-1m";

export type MeetingPreference = "in-person" | "remote" | "no-preference";
export type FeeStructure = "fixed-monthly" | "pay-per-service" | "no-preference";

export interface Accountant {
  id: string;
  name: string;
  title: string;
  firm: string;
  postcode: string;
  city: string;
  coordinates: { lat: number; lng: number };
  bio: string;
  tagline: string;
  qualification: "ICAEW" | "ACCA";
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  services: ServiceId[];
  businessTypes: BusinessType[];
  turnoverRanges: TurnoverRange[];
  meetingPreference: MeetingPreference;
  feeStructure: FeeStructure;
  welshSpeaker: boolean;
  software: string[];
}

// ─── Label maps ───────────────────────────────────────────────────────────────

export const SERVICE_LABELS: Record<ServiceId, string> = {
  "tax-returns": "Tax returns",
  "bookkeeping": "Bookkeeping",
  "payroll": "Payroll",
  "vat-returns": "VAT returns",
  "year-end-accounts": "Year end accounts",
  "rd-tax-credits": "R&D tax credits",
  "management-accounts": "Management accounts",
  "company-secretarial": "Company secretarial",
};

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  "sole-trader": "Sole trader",
  "limited-company": "Limited company",
  "partnership": "Partnership",
  "startup": "Start-up",
};

export const TURNOVER_LABELS: Record<TurnoverRange, string> = {
  "under-50k": "Under £50k",
  "50k-250k": "£50k – £250k",
  "250k-1m": "£250k – £1m",
  "over-1m": "Over £1m",
};

export const FEE_LABELS: Record<FeeStructure, string> = {
  "fixed-monthly": "Fixed monthly fee",
  "pay-per-service": "Pay per service",
  "no-preference": "No preference",
};

export const MEETING_LABELS: Record<MeetingPreference, string> = {
  "in-person": "In person",
  "remote": "Fully remote",
  "no-preference": "No preference",
};

// ─── Accountant database ──────────────────────────────────────────────────────

export const accountants: Accountant[] = [
  // ── 1. Cardiff ───────────────────────────────────────────────────────────
  {
    id: "sian-hughes",
    name: "Siân Hughes",
    title: "Chartered Accountant (ACA)",
    firm: "Hughes & Co",
    postcode: "CF24 0AB",
    city: "Cardiff",
    coordinates: { lat: 51.4937, lng: -3.1609 },
    tagline: "Your trusted Cardiff accountant for small businesses and sole traders.",
    bio: "Based in Roath, Cardiff, Siân has spent 12 years working almost exclusively with Welsh sole traders and small limited companies. A native Welsh speaker, she prides herself on being responsive, jargon-free, and genuinely interested in her clients' businesses. She offers a warm, personal service that larger practices simply can't match.",
    qualification: "ICAEW",
    yearsExperience: 12,
    rating: 4.9,
    reviewCount: 31,
    services: [
      "tax-returns",
      "year-end-accounts",
      "bookkeeping",
      "vat-returns",
      "payroll",
      "management-accounts",
    ],
    businessTypes: ["sole-trader", "limited-company"],
    turnoverRanges: ["under-50k", "50k-250k"],
    meetingPreference: "no-preference",
    feeStructure: "fixed-monthly",
    welshSpeaker: true,
    software: ["Xero", "FreeAgent", "Dext"],
  },

  // ── 2. Swansea ───────────────────────────────────────────────────────────
  {
    id: "david-morgan",
    name: "David Morgan",
    title: "Certified Accountant (FCCA)",
    firm: "Morgan Financial Services",
    postcode: "SA1 5LF",
    city: "Swansea",
    coordinates: { lat: 51.6158, lng: -3.999 },
    tagline: "Growth-focused accounting for ambitious Welsh businesses.",
    bio: "David runs a busy practice in Swansea city centre, specialising in limited companies, partnerships, and fast-growth start-ups. He has deep expertise in R&D tax credits and has helped clients reclaim over £2.3m in relief over the past six years. His pay-per-service model is popular with businesses that want flexibility rather than a fixed monthly commitment.",
    qualification: "ACCA",
    yearsExperience: 9,
    rating: 4.7,
    reviewCount: 24,
    services: [
      "tax-returns",
      "year-end-accounts",
      "vat-returns",
      "company-secretarial",
      "management-accounts",
      "rd-tax-credits",
    ],
    businessTypes: ["limited-company", "partnership", "startup"],
    turnoverRanges: ["50k-250k", "250k-1m", "over-1m"],
    meetingPreference: "no-preference",
    feeStructure: "pay-per-service",
    welshSpeaker: false,
    software: ["Xero", "QuickBooks", "Dext"],
  },

  // ── 3. Newport ───────────────────────────────────────────────────────────
  {
    id: "rhiannon-davies",
    name: "Rhiannon Davies",
    title: "Chartered Accountant (ACA)",
    firm: "Davies Accounts",
    postcode: "NP20 4TA",
    city: "Newport",
    coordinates: { lat: 51.5886, lng: -3.0014 },
    tagline: "Remote-first, detail-obsessed accounting for small Welsh businesses.",
    bio: "Rhiannon is a fully remote accountant based in Newport, working with sole traders and small partnerships across all of Wales. She is known for her meticulous bookkeeping, prompt turnaround, and digital-first approach using Xero and FreeAgent. If you want an accountant you can message on a Tuesday afternoon and hear back within hours, Rhiannon is your match.",
    qualification: "ICAEW",
    yearsExperience: 7,
    rating: 4.8,
    reviewCount: 18,
    services: [
      "bookkeeping",
      "payroll",
      "tax-returns",
      "year-end-accounts",
      "vat-returns",
    ],
    businessTypes: ["sole-trader", "partnership"],
    turnoverRanges: ["under-50k", "50k-250k"],
    meetingPreference: "remote",
    feeStructure: "fixed-monthly",
    welshSpeaker: false,
    software: ["Xero", "FreeAgent", "QuickBooks"],
  },

  // ── 4. Wrexham ───────────────────────────────────────────────────────────
  {
    id: "gareth-williams",
    name: "Gareth Williams",
    title: "Certified Accountant (FCCA)",
    firm: "Williams & Partners",
    postcode: "LL12 7AE",
    city: "Wrexham",
    coordinates: { lat: 53.0521, lng: -3.0085 },
    tagline: "North Wales' go-to accountant for growing businesses.",
    bio: "Gareth leads a growing practice in Wrexham serving clients across North and Mid Wales. He works with a range of established businesses — from limited companies to start-ups — with a particular focus on management accounts, strategic planning, and company secretarial services. A Welsh speaker and regular face at North Wales business networking events, Gareth brings both technical rigour and commercial insight to every client relationship.",
    qualification: "ACCA",
    yearsExperience: 14,
    rating: 4.6,
    reviewCount: 42,
    services: [
      "tax-returns",
      "year-end-accounts",
      "payroll",
      "bookkeeping",
      "company-secretarial",
      "management-accounts",
    ],
    businessTypes: ["limited-company", "partnership", "startup"],
    turnoverRanges: ["50k-250k", "250k-1m"],
    meetingPreference: "in-person",
    feeStructure: "no-preference",
    welshSpeaker: true,
    software: ["Xero", "Sage", "Dext"],
  },

  // ── 6. Carmarthen ───────────────────────────────────────────────────────
  {
    id: "bethan-jones",
    name: "Bethan Jones",
    title: "Certified Accountant (ACCA)",
    firm: "Jones Rural Accounting",
    postcode: "SA31 1BQ",
    city: "Carmarthen",
    coordinates: { lat: 51.8556, lng: -4.3122 },
    tagline: "Rooted in rural Wales — specialist accounting for farming and agricultural businesses.",
    bio: "Bethan has spent her entire career in Carmarthenshire, building deep expertise in farming businesses, agricultural partnerships, and rural sole traders. A fluent Welsh speaker and a farmer's daughter herself, she brings genuine insight into the challenges of running a Welsh rural business. She believes in face-to-face relationships built over years, not just annual tax returns.",
    qualification: "ACCA",
    yearsExperience: 8,
    rating: 4.8,
    reviewCount: 22,
    services: [
      "tax-returns",
      "year-end-accounts",
      "bookkeeping",
      "vat-returns",
      "management-accounts",
    ],
    businessTypes: ["sole-trader", "partnership"],
    turnoverRanges: ["under-50k", "50k-250k"],
    meetingPreference: "in-person",
    feeStructure: "fixed-monthly",
    welshSpeaker: true,
    software: ["FreeAgent", "Xero"],
  },

  // ── 7. Bangor ────────────────────────────────────────────────────────────
  {
    id: "huw-roberts",
    name: "Huw Roberts",
    title: "Chartered Accountant (FCA)",
    firm: "Roberts & Co",
    postcode: "LL57 2DG",
    city: "Bangor",
    coordinates: { lat: 53.2282, lng: -4.1302 },
    tagline: "Senior chartered accountant for growing businesses across North West Wales.",
    bio: "With 16 years of experience and Fellow status with ICAEW, Huw runs an established practice in Bangor serving clients from Anglesey to the Llŷn Peninsula. He has a particular interest in professional services firms, tech start-ups, and owner-managed limited companies. A Welsh speaker, he is comfortable working entirely through the medium of Welsh for clients who prefer it.",
    qualification: "ICAEW",
    yearsExperience: 16,
    rating: 4.7,
    reviewCount: 38,
    services: [
      "tax-returns",
      "year-end-accounts",
      "payroll",
      "management-accounts",
      "company-secretarial",
      "rd-tax-credits",
    ],
    businessTypes: ["limited-company", "partnership", "startup"],
    turnoverRanges: ["50k-250k", "250k-1m"],
    meetingPreference: "no-preference",
    feeStructure: "pay-per-service",
    welshSpeaker: true,
    software: ["Xero", "QuickBooks", "Sage"],
  },

  // ── 8. Llandudno ────────────────────────────────────────────────────────
  {
    id: "emma-price",
    name: "Emma Price",
    title: "Certified Accountant (ACCA)",
    firm: "Price Accountancy",
    postcode: "LL30 2LP",
    city: "Llandudno",
    coordinates: { lat: 53.3250, lng: -3.8278 },
    tagline: "Straightforward, modern accounting for tourism, hospitality, and retail businesses.",
    bio: "Emma set up her practice in Llandudno six years ago, quickly building a loyal client base among the town's hotel, restaurant, and retail owners. She has a talent for making accounting feel simple and approachable, and her flexible fee structure suits seasonal businesses that don't want to pay a fixed monthly rate year-round. Emma works with clients across the whole of the North Wales coast.",
    qualification: "ACCA",
    yearsExperience: 6,
    rating: 4.6,
    reviewCount: 19,
    services: [
      "tax-returns",
      "bookkeeping",
      "vat-returns",
      "year-end-accounts",
      "payroll",
    ],
    businessTypes: ["sole-trader", "limited-company", "startup"],
    turnoverRanges: ["under-50k", "50k-250k"],
    meetingPreference: "no-preference",
    feeStructure: "no-preference",
    welshSpeaker: false,
    software: ["QuickBooks", "FreeAgent", "Dext"],
  },

  // ── 9. Pontypridd ────────────────────────────────────────────────────────
  {
    id: "owen-thomas",
    name: "Owen Thomas",
    title: "Chartered Accountant (ACA)",
    firm: "Thomas & Associates",
    postcode: "CF37 1DG",
    city: "Pontypridd",
    coordinates: { lat: 51.6018, lng: -3.3415 },
    tagline: "Valleys-based accountant with deep expertise in construction, trades, and manufacturing.",
    bio: "Owen has been at the heart of the Valleys business community for a decade, working primarily with construction firms, trades contractors, and manufacturing businesses. He understands the cash flow pressures and project-based nature of these industries, and his pay-per-service model means clients only pay for what they need. A proud Welsh speaker, Owen is known for his direct, practical approach.",
    qualification: "ICAEW",
    yearsExperience: 10,
    rating: 4.8,
    reviewCount: 33,
    services: [
      "tax-returns",
      "year-end-accounts",
      "payroll",
      "bookkeeping",
      "management-accounts",
      "rd-tax-credits",
    ],
    businessTypes: ["sole-trader", "limited-company", "partnership"],
    turnoverRanges: ["50k-250k", "250k-1m"],
    meetingPreference: "in-person",
    feeStructure: "pay-per-service",
    welshSpeaker: true,
    software: ["Xero", "Sage", "Dext"],
  },

  // ── 10. Bridgend ────────────────────────────────────────────────────────
  {
    id: "lisa-chamberlain",
    name: "Lisa Chamberlain",
    title: "Certified Accountant (FCCA)",
    firm: "Chamberlain Corporate Accounts",
    postcode: "CF31 1EB",
    city: "Bridgend",
    coordinates: { lat: 51.5043, lng: -3.576 },
    tagline: "Corporate accountancy for established Welsh businesses with serious ambitions.",
    bio: "Lisa runs a corporate-focused practice in Bridgend specialising in larger limited companies, manufacturing businesses, and multi-site operations. With 12 years of post-qualification experience — including time at a Big Four firm — she brings a level of technical depth rarely found outside a city centre practice. She works exclusively via a fixed monthly retainer and provides fully remote services, making her accessible to businesses across South and West Wales.",
    qualification: "ACCA",
    yearsExperience: 12,
    rating: 4.9,
    reviewCount: 16,
    services: [
      "tax-returns",
      "year-end-accounts",
      "vat-returns",
      "management-accounts",
      "company-secretarial",
      "rd-tax-credits",
    ],
    businessTypes: ["limited-company", "partnership"],
    turnoverRanges: ["250k-1m", "over-1m"],
    meetingPreference: "remote",
    feeStructure: "fixed-monthly",
    welshSpeaker: false,
    software: ["Xero", "QuickBooks", "Sage", "Dext"],
  },

  // ── 5. Aberystwyth ───────────────────────────────────────────────────────
  {
    id: "cerys-evans",
    name: "Cerys Evans",
    title: "Chartered Accountant (ACA)",
    firm: "Evans Rural Accountancy",
    postcode: "SY23 2AX",
    city: "Aberystwyth",
    coordinates: { lat: 52.4154, lng: -4.0834 },
    tagline: "Specialist accountancy for rural, creative, and early-stage Welsh businesses.",
    bio: "Cerys is based in Aberystwyth and serves clients across Ceredigion, Powys, and the wider Mid and West Wales region. A fluent Welsh speaker, she has a particular specialism in agricultural businesses, rural sole traders, and early-stage start-ups — including R&D tax credit claims for innovative small businesses. She offers both in-person meetings and remote support, and has a fixed monthly fee that her clients find reassuringly predictable.",
    qualification: "ICAEW",
    yearsExperience: 11,
    rating: 4.9,
    reviewCount: 27,
    services: [
      "tax-returns",
      "bookkeeping",
      "year-end-accounts",
      "management-accounts",
      "rd-tax-credits",
    ],
    businessTypes: ["sole-trader", "startup"],
    turnoverRanges: ["under-50k", "50k-250k"],
    meetingPreference: "no-preference",
    feeStructure: "fixed-monthly",
    welshSpeaker: true,
    software: ["FreeAgent", "Xero", "QuickBooks"],
  },
];
