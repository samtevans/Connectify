import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand: warm brown (buttons, highlights, accents) ───────────────
        brand: {
          50:  "#fdf8f0",
          100: "#f5e4c6",
          200: "#e9c898",
          300: "#d9a85f",
          400: "#c78830",
          500: "#b06a18",
          600: "#935210",  // primary CTA
          700: "#763d0b",
          800: "#5a2c07",
          900: "#3d1d04",
        },
        // ── Cream: warm parchment backgrounds ─────────────────────────────
        cream: {
          50:  "#fffef8",
          100: "#fdf8f0",  // main page background
          200: "#f5ebda",
          300: "#eaddc5",
        },
        // ── Slate override: replace blue-gray with warm brown-gray tones ───
        // Every text-slate-*, bg-slate-*, border-slate-* becomes warm.
        slate: {
          50:  "#fefcf9",
          100: "#f5ead8",
          200: "#e5d3ba",
          300: "#c9b094",
          400: "#a08070",
          500: "#78605a",
          600: "#5c4438",
          700: "#44302a",
          800: "#2e1e18",
          900: "#1a0e09",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
