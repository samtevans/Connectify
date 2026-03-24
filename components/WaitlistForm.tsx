"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  size?: "default" | "large";
  defaultType?: "business" | "accountant";
  placeholder?: string;
}

export default function WaitlistForm({
  size = "default",
  defaultType = "business",
  placeholder = "Enter your email address",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: defaultType }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-xl px-5 py-4 text-brand-800 font-medium">
        <CheckCircle2 className="shrink-0 text-brand-600" size={20} />
        <span>{message}</span>
      </div>
    );
  }

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex flex-col sm:flex-row gap-3 ${
          isLarge ? "sm:gap-2" : "gap-3"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={`input-field flex-1 ${
            isLarge ? "text-base py-4 px-5" : ""
          } ${status === "error" ? "border-red-400 focus:ring-red-400" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`btn-primary shrink-0 ${
            isLarge ? "py-4 px-8 text-base" : ""
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Join waitlist
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </form>
  );
}
