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
        brand: {
          50:  "#eef6fb",
          100: "#d4e9f5",
          200: "#a9d3eb",
          300: "#7bbde0",
          400: "#52a6d3",
          500: "#318fc3",
          600: "#2175a6",
          700: "#1a5d87",
          800: "#14496b",
          900: "#0e3854",
        },
        cream: {
          50:  "#fffdf9",
          100: "#faf6ee",
          200: "#f3ebe0",
          300: "#e8ddd0",
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
