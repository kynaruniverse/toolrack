import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens — practical, reliable, on-site-in-daylight legible.
        rack: {
          bg: "#14161A",       // near-black worksite steel
          surface: "#1D2025",
          border: "#2C3038",
          text: "#F2F1ED",     // chalk
          muted: "#9CA3AF",
          accent: "#F5A623",   // hi-vis amber — the one bright thing
          accentDark: "#C9820F",
          good: "#4ADE80",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
