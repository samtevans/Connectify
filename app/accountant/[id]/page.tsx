import Link from "next/link";
import {
  MapPin,
  Star,
  BadgeCheck,
  Phone,
  Calendar,
  ArrowLeft,
  Building2,
  Clock,
  Languages,
  CheckCircle,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Placeholder data (replace with real DB lookup) ────────────────────────────
const MOCK_ACCOUNTANT = {
  id: "sian-hughes",
  name: "Siân Hughes",
  title: "Chartered Accountant (ACA)",
  firm: "Hughes & Co Accountants",
  location: "Cardiff, Wales",
  radius: "Cardiff, Vale of Glamorgan & surrounding areas",
  tagline:
    "Specialist in small and growing Welsh businesses. Helping founders focus on what they love.",
  bio: "With over 12 years of experience working exclusively with Welsh SMEs, I understand the unique challenges and opportunities that come with building a business here. I offer a personal, proactive service — not just annual accounts, but ongoing strategic advice and support throughout the year.",
  verified: true,
  yearsExperience: 12,
  clientCount: 48,
  responseTime: "Within 4 hours",
  languages: ["English", "Welsh (Cymraeg)"],
  specialisms: [
    "Small business & sole traders",
    "E-commerce",
    "Creative industries",
    "Construction & trades",
    "Start-ups & early-stage",
    "R&D Tax Credits",
  ],
  services: [
    "Annual accounts & corporation tax",
    "Self-assessment tax returns",
    "VAT returns & Making Tax Digital",
    "Payroll & auto-enrolment",
    "Management accounts",
    "Business planning & forecasting",
    "Company formation",
  ],
  software: ["Xero", "QuickBooks", "FreeAgent", "Dext"],
  credentials: [
    { body: "ICAEW", membership: "ACA", number: "ACA123456" },
    { body: "HMRC", membership: "Agent authorised", number: "—" },
  ],
  rating: 4.9,
  reviewCount: 31,
  reviews: [
    {
      name: "Tom Watkins",
      role: "E-commerce founder",
      rating: 5,
      date: "March 2025",
      text: "Siân took the time to really understand my business before giving any advice. Switching to her was the best decision I made last year.",
    },
    {
      name: "Cerys Morgan",
      role: "Freelance photographer",
      rating: 5,
      date: "January 2025",
      text: "Dealt with everything in Welsh, which meant the world to me. Incredibly thorough and always responds quickly.",
    },
    {
      name: "Dan Peters",
      role: "Construction contractor",
      rating: 5,
      date: "November 2024",
      text: "Sorted my CIS returns and corporation tax with zero fuss. Genuinely great value and always proactive.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export default function AccountantProfile({
  params,
}: {
  params: { id: string };
}) {
  const acct = MOCK_ACCOUNTANT; // In production: fetch by params.id

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to matches
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* ── LEFT: Profile card ─────────────────────────────────────── */}
          <aside className="lg:col-span-1 flex flex-col gap-5">
            {/* Main card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Header band */}
              <div className="h-20 bg-gradient-to-br from-brand-600 to-brand-700" />

              {/* Avatar + name */}
              <div className="px-6 pb-6">
                <div className="relative -mt-10 mb-4">
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-400 select-none">
                      {acct.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  {acct.verified && (
                    <span
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center border-2 border-white"
                      title="Verified accountant"
                    >
                      <BadgeCheck size={13} className="text-white" />
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {acct.name}
                </h1>
                <p className="text-sm text-brand-600 font-semibold mt-0.5">
                  {acct.title}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{acct.firm}</p>

                {/* Location */}
                <div className="flex items-center gap-1.5 mt-3 text-slate-500 text-sm">
                  <MapPin size={14} className="shrink-0 text-slate-400" />
                  {acct.location}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.round(acct.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {acct.rating}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({acct.reviewCount} reviews)
                  </span>
                </div>

                {/* Verified badge */}
                {acct.verified && (
                  <div className="mt-4 flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-xl px-3 py-2.5">
                    <BadgeCheck size={15} className="text-brand-600 shrink-0" />
                    <span className="text-xs text-brand-700 font-semibold">
                      Verified &amp; credential-checked
                    </span>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { val: `${acct.yearsExperience}yrs`, label: "Experience" },
                    { val: acct.clientCount, label: "Clients" },
                    { val: acct.responseTime.replace("Within ", ""), label: "Response" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-cream-100 rounded-xl p-2.5 text-center"
                    >
                      <div className="text-sm font-extrabold text-slate-900">
                        {s.val}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col gap-2 mt-5">
                  <button className="btn-primary w-full justify-center">
                    <Calendar size={15} />
                    Book free consultation
                  </button>
                  <button className="btn-secondary w-full justify-center">
                    <Phone size={15} />
                    Message Siân
                  </button>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                <Languages size={15} className="text-brand-500" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {acct.languages.map((l) => (
                  <span
                    key={l}
                    className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full font-medium"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Software */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-3">
                Software used
              </h3>
              <div className="flex flex-wrap gap-2">
                {acct.software.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RIGHT: Detail panels ───────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Tagline / bio */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-base font-semibold text-slate-800 mb-3 leading-snug">
                {acct.tagline}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">{acct.bio}</p>
            </div>

            {/* Service area */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-brand-500" />
                Service area
              </h2>
              <p className="text-sm text-slate-600">{acct.radius}</p>
            </div>

            {/* Specialisms */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-brand-500" />
                Industry specialisms
              </h2>
              <div className="flex flex-wrap gap-2">
                {acct.specialisms.map((s) => (
                  <span
                    key={s}
                    className="text-sm bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1.5 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <CheckCircle size={16} className="text-brand-500" />
                Services offered
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {acct.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Credentials */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <BadgeCheck size={16} className="text-brand-500" />
                Professional credentials
              </h2>
              <div className="divide-y divide-slate-100">
                {acct.credentials.map((c) => (
                  <div
                    key={c.body}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <span className="text-sm font-bold text-slate-900">
                        {c.body}
                      </span>
                      <span className="text-sm text-slate-500 ml-2">
                        {c.membership}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {c.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  Client reviews
                </h2>
                <span className="text-sm text-slate-500">
                  {acct.rating} · {acct.reviewCount} reviews
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {acct.reviews.map((r) => (
                  <div
                    key={r.name}
                    className="bg-cream-100 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {r.name}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">
                          {r.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={10} />
                          {r.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Quote
                        size={14}
                        className="text-brand-300 shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
