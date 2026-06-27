import type { Config } from "tailwindcss";

/**
 * Design tokens mirror the Freewill design system:
 *  - `ink`   : deep navy backgrounds used across sections
 *  - `brand` : teal accents (links, labels, dividers)
 *  - `cream` : warm off-white used for the wordmark / CTA buttons
 *  - fonts   : Anton (display), Archivo (body), JetBrains Mono (technical)
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0E1C", // base page background
          deep: "#05080F", // hero overlay shadow
          panel: "#0E1730", // alternating section background
          raised: "#13203F", // hover state for cards
          card: "#111827", // image placeholder background
        },
        brand: {
          DEFAULT: "#00687F", // primary teal
          accent: "#5FD0E0", // bright accent (links, dividers)
          light: "#9FE4EF", // labels on dark
          pale: "#BCE7EF", // hover text
        },
        cream: "#F1EAD8", // wordmark / inverted buttons
        surface: "#EAF8FB", // primary heading text
        mist: "#DFF6FA", // body text base (used with opacity)
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        sans: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      keyframes: {
        "ribbon-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "swatch-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
      animation: {
        "ribbon-scroll": "ribbon-scroll 26s linear infinite",
        "swatch-pulse": "swatch-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
