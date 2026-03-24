import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
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
              <span className="text-white font-bold text-base">Connectify</span>
            </div>
            <p className="text-sm leading-relaxed">
              The smarter way for Welsh businesses to find their perfect
              accountant.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Get matched</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
            </ul>
          </div>

          {/* Accountants */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Accountants</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/signup?type=accountant" className="hover:text-white transition-colors">Join as accountant</Link></li>
              <li><Link href="#why-connectify" className="hover:text-white transition-colors">Why list with us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>&copy; {new Date().getFullYear()} Connectify. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>
            Made for Welsh businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
