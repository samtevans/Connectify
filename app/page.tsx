import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Shield,
  Zap,
  PhoneOff,
  Users,
  BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

// ─── How It Works ────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: <Users size={22} className="text-brand-600" />,
    title: "Answer a few questions",
    description:
      "Tell us about your business — industry, size, what you need help with, and where you're based in Wales. Takes under 2 minutes.",
  },
  {
    number: "02",
    icon: <Zap size={22} className="text-brand-600" />,
    title: "Get instantly matched",
    description:
      "Our smart matching engine finds the one accountant who fits your exact needs — not a list of strangers competing for your attention.",
  },
  {
    number: "03",
    icon: <BadgeCheck size={22} className="text-brand-600" />,
    title: "Book a free consultation",
    description:
      "Review your match's profile, verified credentials, and client reviews — then book a no-obligation call directly through the platform.",
  },
];

// ─── Why Connectify ───────────────────────────────────────────────────────────
const comparisons = [
  {
    feature: "Cold calls from strangers",
    connectify: false,
    others: true,
  },
  {
    feature: "Multiple quotes to manage",
    connectify: false,
    others: true,
  },
  {
    feature: "One perfect, curated match",
    connectify: true,
    others: false,
  },
  {
    feature: "Verified local accountants only",
    connectify: true,
    others: false,
  },
  {
    feature: "Free initial consultation",
    connectify: true,
    others: false,
  },
  {
    feature: "Specialist matching by industry",
    connectify: true,
    others: false,
  },
];

// ─── Trust stats ─────────────────────────────────────────────────────────────
const stats = [
  { value: "100%", label: "Welsh-based accountants" },
  { value: "ICAEW", label: "Verified members only" },
  { value: "Free", label: "No-obligation first call" },
  { value: "< 24h", label: "Average match time" },
];

// ─── Testimonials (placeholder) ───────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "Found an accountant who actually understands farming businesses in under a day. Couldn't believe how easy it was.",
    name: "Rhys Thomas",
    role: "Sheep farmer, Powys",
    stars: 5,
  },
  {
    quote:
      "After getting bombarded by calls from Bark, this was a revelation. One match, one call, sorted.",
    name: "Sioned Williams",
    role: "Freelance designer, Cardiff",
    stars: 5,
  },
  {
    quote:
      "My accountant specialises in Welsh language businesses — I'd never have found that on my own.",
    name: "Gareth Davies",
    role: "Café owner, Aberystwyth",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream-100 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Background gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-brand-50 opacity-60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-brand-100 opacity-40 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Now matching Welsh businesses
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 text-center leading-[1.08] tracking-tight mb-6">
            Your perfect accountant,
            <br />
            <span className="text-brand-600">matched instantly.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Connectify pairs Welsh businesses with the right local, verified
            accountant — in minutes, not weeks. No cold calls. No endless
            quotes. Just one great match.
          </p>

          {/* Waitlist form */}
          <div className="max-w-xl mx-auto mb-8">
            <WaitlistForm size="large" placeholder="Your business email address" />
            <p className="text-center text-sm text-slate-400 mt-3">
              Free to join. No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-slate-500">
            {["No cold calls", "Verified accountants", "Welsh businesses only"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-brand-500 shrink-0" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-brand-600 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {s.value}
                </div>
                <div className="text-brand-200 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream-200 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">
              Simple process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
              Three steps to your ideal accountant
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              We handle the hard part so you can focus on running your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connector line */}
            <div
              aria-hidden
              className="hidden md:block absolute top-10 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200"
            />

            {steps.map((step) => (
              <div
                key={step.number}
                className="card p-8 flex flex-col items-start gap-4 relative"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center border border-brand-100">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 select-none leading-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/match" className="btn-primary">
              Get started free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CONNECTIFY ────────────────────────────────────────────────── */}
      <section id="why-connectify" className="bg-cream-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">
              Why we're different
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
              Tired of cold calls and confusion?
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Platforms like Bark flood your inbox with strangers competing for
              your business. Connectify works the other way round.
            </p>
          </div>

          {/* Comparison table */}
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 mb-3 px-4">
              <div className="col-span-1" />
              <div className="text-center text-sm font-bold text-brand-700 bg-brand-50 rounded-t-xl pt-3 pb-2 border border-b-0 border-brand-200">
                Connectify
              </div>
              <div className="text-center text-sm font-semibold text-slate-400 pt-3 pb-2">
                Others (Bark etc.)
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-cream-300 shadow-sm divide-y divide-cream-200">
              {comparisons.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 items-center px-4 py-4 ${
                    i % 2 === 0 ? "bg-cream-50" : "bg-cream-100"
                  }`}
                >
                  <span className="text-sm text-slate-700 font-medium">
                    {row.feature}
                  </span>
                  <div className="flex justify-center">
                    {row.connectify ? (
                      <span className="inline-flex items-center gap-1 text-brand-700 bg-brand-50 border border-brand-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle size={12} />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-100 text-xs font-medium px-2.5 py-1 rounded-full">
                        <PhoneOff size={12} />
                        No
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.others ? (
                      <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 text-xs font-medium px-2.5 py-1 rounded-full">
                        ✕ Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-100 text-xs font-medium px-2.5 py-1 rounded-full">
                        ✕ No
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefit pills */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <PhoneOff size={20} className="text-brand-600" />,
                title: "No cold calls",
                desc: "Your details are never shared with multiple accountants. One match, introduced properly.",
              },
              {
                icon: <MapPin size={20} className="text-brand-600" />,
                title: "Local & verified",
                desc: "Every accountant on Connectify is based in Wales and holds verified professional credentials.",
              },
              {
                icon: <Shield size={20} className="text-brand-600" />,
                title: "Free to use",
                desc: "Matching is completely free for businesses. You only pay your accountant — if you hire them.",
              },
            ].map((b) => (
              <div key={b.title} className="card p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                  {b.icon}
                </div>
                <h3 className="font-bold text-slate-900">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-brand-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">
              Real Welsh businesses
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
              What our members say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card bg-cream-50 p-6 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-slate-700 text-sm leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-brand-700 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to find your match?
          </h2>
          <p className="text-brand-200 text-lg mb-10 leading-relaxed">
            Join the waitlist today and be among the first Welsh businesses to
            get matched when we launch.
          </p>
          <div className="max-w-lg mx-auto">
            <WaitlistForm
              size="large"
              placeholder="Your business email address"
            />
          </div>
          <p className="text-brand-300 text-sm mt-4">
            Free forever for businesses. No credit card required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
