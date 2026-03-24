import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connectify — Find Your Perfect Welsh Accountant",
  description:
    "Get instantly matched with a verified local accountant for your Welsh business. No cold calls, no endless quotes — one perfect match.",
  keywords: ["accountant", "Wales", "Welsh business", "accounting", "bookkeeping"],
  openGraph: {
    title: "Connectify — Find Your Perfect Welsh Accountant",
    description: "Instant accountant matching for Welsh businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
