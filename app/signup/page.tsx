"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Building2, Briefcase } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ── Business signup fields ────────────────────────────────────────────────────
function BusinessForm() {
  const [showPassword, setShowPassword] = useState(false);

  const industries = [
    "Agriculture & Farming",
    "Construction & Trades",
    "Creative & Media",
    "E-commerce & Retail",
    "Food & Hospitality",
    "Healthcare",
    "Professional Services",
    "Technology",
    "Tourism",
    "Other",
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            First name
          </label>
          <input
            type="text"
            placeholder="Rhys"
            autoComplete="given-name"
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Last name
          </label>
          <input
            type="text"
            placeholder="Thomas"
            autoComplete="family-name"
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Business name
        </label>
        <input
          type="text"
          placeholder="Your business name"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Industry</label>
        <select className="input-field appearance-none bg-white cursor-pointer">
          <option value="">Select your industry</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Location in Wales
        </label>
        <input
          type="text"
          placeholder="e.g. Cardiff, Swansea, Aberystwyth…"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@business.com"
          autoComplete="email"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className="input-field pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 shrink-0"
        />
        <span className="text-sm text-slate-600 leading-snug">
          I agree to the{" "}
          <Link href="#" className="text-brand-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-brand-600 hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>

      <button type="submit" className="btn-primary w-full justify-center mt-1">
        Find my accountant
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

// ── Accountant signup fields ───────────────────────────────────────────────────
function AccountantForm() {
  const [showPassword, setShowPassword] = useState(false);

  const specialisms = [
    "Agriculture",
    "Construction",
    "Creative industries",
    "E-commerce",
    "Hospitality",
    "NHS / Healthcare",
    "Property & Real estate",
    "Small business / Sole trader",
    "Start-ups",
    "Tech",
    "Welsh language services",
    "Other",
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            First name
          </label>
          <input
            type="text"
            placeholder="Siân"
            autoComplete="given-name"
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Last name
          </label>
          <input
            type="text"
            placeholder="Hughes"
            autoComplete="family-name"
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Practice / firm name
        </label>
        <input
          type="text"
          placeholder="Hughes & Co Accountants"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Professional body membership
        </label>
        <select className="input-field appearance-none bg-white cursor-pointer">
          <option value="">Select your accreditation</option>
          <option value="icaew">ICAEW (ACA / FCA)</option>
          <option value="acca">ACCA</option>
          <option value="cima">CIMA</option>
          <option value="aat">AAT</option>
          <option value="icpa">ICPA</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Area(s) served in Wales
        </label>
        <input
          type="text"
          placeholder="e.g. Cardiff, Vale of Glamorgan, all of Wales…"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Industry specialisms{" "}
          <span className="text-slate-400 font-normal">(select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-cream-300 rounded-xl p-3 bg-cream-100">
          {specialisms.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-xs text-slate-700">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@yourfirm.co.uk"
          autoComplete="email"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className="input-field pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 shrink-0"
        />
        <span className="text-sm text-slate-600 leading-snug">
          I agree to the{" "}
          <Link href="#" className="text-brand-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and confirm I hold valid professional indemnity insurance.
        </span>
      </label>

      <button type="submit" className="btn-primary w-full justify-center mt-1">
        Create accountant profile
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function SignupContent() {
  const params = useSearchParams();
  const initialType =
    params.get("type") === "accountant" ? "accountant" : "business";
  const [type, setType] = useState<"business" | "accountant">(initialType);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Top bar */}
      <header className="h-16 bg-cream-50 border-b border-cream-300 flex items-center px-4 sm:px-6">
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
          <span className="font-bold text-slate-900">Connectify</span>
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Free to join. No credit card required.
            </p>
          </div>

          {/* Type toggle */}
          <div className="flex bg-cream-200 rounded-xl p-1 mb-8">
            <button
              onClick={() => setType("business")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                type === "business"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 size={15} />
              I&apos;m a business
            </button>
            <button
              onClick={() => setType("accountant")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                type === "accountant"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Briefcase size={15} />
              I&apos;m an accountant
            </button>
          </div>

          {/* Card */}
          <div className="bg-cream-50 rounded-2xl border border-cream-300 shadow-sm p-8">
            {type === "business" ? <BusinessForm /> : <AccountantForm />}
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-600 font-semibold hover:text-brand-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
