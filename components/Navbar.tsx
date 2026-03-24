"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-100/90 backdrop-blur-md border-b border-cream-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Connectify
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="#how-it-works" className="btn-ghost text-sm">
            How it works
          </Link>
          <Link href="#why-connectify" className="btn-ghost text-sm">
            Why Connectify
          </Link>
          <Link href="/login" className="btn-ghost text-sm">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary text-sm py-2">
            Get matched free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-cream-300 bg-cream-100 px-4 py-4 flex flex-col gap-2">
          <Link
            href="#how-it-works"
            className="py-2 px-3 text-slate-700 font-medium rounded-lg hover:bg-cream-200"
            onClick={() => setOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="#why-connectify"
            className="py-2 px-3 text-slate-700 font-medium rounded-lg hover:bg-cream-200"
            onClick={() => setOpen(false)}
          >
            Why Connectify
          </Link>
          <Link
            href="/login"
            className="py-2 px-3 text-slate-700 font-medium rounded-lg hover:bg-cream-200"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="btn-primary w-full justify-center mt-1"
            onClick={() => setOpen(false)}
          >
            Get matched free
          </Link>
        </div>
      )}
    </header>
  );
}
