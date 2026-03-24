"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle,
  Loader2,
  MapPin,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";
import {
  SERVICE_LABELS,
  FEE_LABELS,
  MEETING_LABELS,
} from "@/lib/accountants";
import {
  generateExplanations,
  type MatchAnswers,
  type MatchResult,
} from "@/lib/matching";

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({
  earned,
  max,
  label,
  text,
}: {
  earned: number;
  max: number;
  label: string;
  text: string;
}) {
  const pct = Math.round((earned / max) * 100);
  const color =
    pct >= 80
      ? "bg-brand-500"
      : pct >= 50
      ? "bg-brand-400"
      : pct >= 25
      ? "bg-amber-400"
      : "bg-slate-300";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="text-slate-500 font-medium tabular-nums">
          {earned} / {max} pts
        </span>
      </div>
      <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type AiStatus = "none" | "loading" | "success" | "error";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<MatchResult | null>(null);
  const [answers, setAnswers] = useState<MatchAnswers | null>(null);
  const [loading, setLoading] = useState(true);

  const [aiScore, setAiScore] = useState(0);
  const [aiExplanation, setAiExplanation] = useState("");
  const [aiStatus, setAiStatus] = useState<AiStatus>("none");
  const [aiVisible, setAiVisible] = useState(false);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("connectify_match_result");
    const rawAnswers = sessionStorage.getItem("connectify_match_answers");

    if (!rawResult || !rawAnswers) {
      router.replace("/match");
      return;
    }

    let parsedResult: MatchResult;
    let parsedAnswers: MatchAnswers;
    try {
      parsedResult = JSON.parse(rawResult) as MatchResult;
      parsedAnswers = JSON.parse(rawAnswers) as MatchAnswers;
    } catch {
      router.replace("/match");
      return;
    }

    setResult(parsedResult);
    setAnswers(parsedAnswers);
    setLoading(false);

    // Trigger AI review if freeText was provided
    if (parsedAnswers.freeText?.trim()) {
      setAiStatus("loading");
      fetch("/api/ai-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          freeText: parsedAnswers.freeText,
          accountantId: parsedResult.accountant.id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setAiScore(data.score ?? 0);
          setAiExplanation(data.explanation ?? "AI review unavailable.");
          setAiStatus("success");
          // Small delay so the element is rendered before we fade it in
          setTimeout(() => setAiVisible(true), 50);
        })
        .catch(() => {
          setAiStatus("error");
          setTimeout(() => setAiVisible(true), 50);
        });
    }
  }, [router]);

  if (loading || !result || !answers) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { accountant, breakdown, distanceMiles } = result;
  const explanations = generateExplanations(result, answers);
  const ruleScore = breakdown.total;
  const totalScore = ruleScore + (aiStatus === "success" ? aiScore : 0);
  const maxScore = aiStatus === "none" ? 100 : 130;
  const initials = accountant.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const distanceStr =
    distanceMiles !== null ? `${Math.round(distanceMiles)} miles away` : null;

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
        <button
          onClick={() => router.push("/match")}
          className="btn-ghost text-sm border border-cream-300"
        >
          <RotateCcw size={14} />
          Start again
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Hero result header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <CheckCircle size={14} />
            Your perfect match
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            We found your accountant.
          </h1>
          <p className="text-slate-500">
            Based on your answers, here&apos;s who we recommend.
          </p>
        </div>

        {/* Accountant hero card */}
        <div className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden mb-6">
          {/* Colour band */}
          <div className="h-16 bg-gradient-to-r from-brand-600 to-brand-500" />

          <div className="px-6 pb-6">
            {/* Avatar row */}
            <div className="flex items-end justify-between -mt-8 mb-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-cream-200 border-4 border-white shadow flex items-center justify-center">
                  <span className="text-2xl font-black text-slate-400 select-none">
                    {initials}
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center border-2 border-white">
                  <BadgeCheck size={13} className="text-white" />
                </span>
              </div>

              {/* Match score badge */}
              <div className="flex flex-col items-end">
                <div className="text-4xl font-black text-brand-600 leading-none tabular-nums">
                  {totalScore}
                  <span className="text-xl text-brand-400"> / {maxScore}</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  match score
                </div>
              </div>
            </div>

            {/* Name & details */}
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
              {accountant.name}
            </h2>
            <p className="text-sm text-brand-600 font-semibold mt-0.5">
              {accountant.title}
            </p>
            <p className="text-sm text-slate-500">{accountant.firm}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                {accountant.city}
                {distanceStr && (
                  <span className="text-slate-400">· {distanceStr}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <BadgeCheck size={14} className="text-brand-500 shrink-0" />
                {accountant.qualification} verified
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
                {accountant.rating} ({accountant.reviewCount} reviews)
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm text-slate-600 mt-4 leading-relaxed italic">
              &ldquo;{accountant.tagline}&rdquo;
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href={`/accountant/${accountant.id}`}
                className="btn-primary flex-1 justify-center"
              >
                <Calendar size={16} />
                Book free consultation
              </Link>
              <Link
                href={`/accountant/${accountant.id}`}
                className="btn-secondary flex-1 justify-center"
              >
                View full profile
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Why we matched you */}
        <div className="bg-white rounded-2xl border border-cream-300 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-5">
            Why we matched you
          </h3>
          <div className="flex flex-col gap-6 divide-y divide-cream-200">
            {explanations.map((item, i) => (
              <div key={item.factor} className={i > 0 ? "pt-5" : ""}>
                <ScoreBar
                  label={item.factor}
                  earned={item.earned}
                  max={item.max}
                  text={item.text}
                />
              </div>
            ))}
          </div>

          {/* Rule-based total */}
          <div className="mt-6 pt-5 border-t border-cream-300 flex items-center justify-between">
            <span className="font-bold text-slate-900">Rule-based score</span>
            <span className="text-2xl font-black text-brand-600 tabular-nums">
              {ruleScore} / 100
            </span>
          </div>

          {/* AI review section */}
          {aiStatus !== "none" && (
            <div
              className={`mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 transition-opacity duration-1000 ${
                aiVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={15} className="text-brand-600 shrink-0" />
                <span className="text-sm font-bold text-brand-700">AI review</span>
                {aiStatus === "loading" && (
                  <Loader2 size={13} className="animate-spin text-brand-500 ml-auto" />
                )}
                {aiStatus === "success" && (
                  <span className="ml-auto text-sm font-black text-brand-600 tabular-nums">
                    {aiScore} / 30
                  </span>
                )}
              </div>
              {aiStatus === "loading" && (
                <p className="text-xs text-slate-500">Reviewing your situation…</p>
              )}
              {aiStatus === "success" && (
                <p className="text-xs text-slate-600 leading-relaxed">{aiExplanation}</p>
              )}
              {aiStatus === "error" && (
                <p className="text-xs text-slate-500">AI review unavailable.</p>
              )}
            </div>
          )}

          {/* Grand total */}
          {aiStatus === "success" && (
            <div
              className={`mt-4 pt-4 border-t border-cream-300 flex items-center justify-between transition-opacity duration-1000 ${
                aiVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="font-bold text-slate-900">Total score</span>
              <span className="text-2xl font-black text-brand-600 tabular-nums">
                {totalScore} / 130
              </span>
            </div>
          )}
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-cream-300 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            About {accountant.name.split(" ")[0]}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {accountant.bio}
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Services */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Services offered
              </h4>
              <ul className="flex flex-col gap-1.5">
                {accountant.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                    {SERVICE_LABELS[s]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Fee structure
                </h4>
                <p className="text-sm text-slate-700">
                  {FEE_LABELS[accountant.feeStructure]}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Meetings
                </h4>
                <p className="text-sm text-slate-700">
                  {MEETING_LABELS[accountant.meetingPreference]}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Qualification
                </h4>
                <p className="text-sm text-slate-700">
                  {accountant.qualification} · {accountant.yearsExperience} years experience
                </p>
              </div>
              {accountant.welshSpeaker && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Languages
                  </h4>
                  <p className="text-sm text-slate-700">
                    English &amp; Welsh (Cymraeg)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-brand-600 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-extrabold text-white mb-2">
            Ready to get started?
          </h3>
          <p className="text-brand-200 text-sm mb-5">
            Book your free, no-obligation consultation with {accountant.name.split(" ")[0]} today.
          </p>
          <Link
            href={`/accountant/${accountant.id}`}
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
          >
            <Calendar size={16} />
            Book free consultation
          </Link>
        </div>

        {/* Not happy? */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Not quite right?{" "}
            <button
              onClick={() => router.push("/match")}
              className="text-brand-600 font-semibold hover:text-brand-700"
            >
              Try the questionnaire again
            </button>{" "}
            or{" "}
            <Link href="/signup" className="text-brand-600 font-semibold hover:text-brand-700">
              join our waitlist
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
