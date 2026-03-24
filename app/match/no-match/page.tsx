import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export default function NoMatchPage() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-cream-50 border-b border-cream-300 flex items-center px-4 sm:px-6 shrink-0">
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
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-cream-200 border border-cream-300 flex items-center justify-center mx-auto mb-6">
            <SearchX size={28} className="text-slate-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            No exact match yet
          </h1>
          <p className="text-slate-500 leading-relaxed mb-2">
            We couldn&apos;t find an accountant in our current network who
            scores highly enough on all your criteria.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8">
            Our network is growing every week. Join the waitlist and we&apos;ll
            notify you the moment we have the right match for your business.
          </p>

          {/* Waitlist form */}
          <div className="bg-white rounded-2xl border border-cream-300 shadow-sm p-6 mb-6 text-left">
            <h2 className="font-bold text-slate-900 mb-1">
              Get notified when we find your match
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Free to join. No spam, ever.
            </p>
            <WaitlistForm placeholder="Your email address" />
          </div>

          {/* Try again */}
          <Link
            href="/match"
            className="btn-secondary w-full justify-center"
          >
            <ArrowLeft size={16} />
            Try different answers
          </Link>

          <p className="text-xs text-slate-400 mt-6">
            You can also{" "}
            <Link href="/" className="text-brand-600 hover:underline">
              return to the homepage
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
