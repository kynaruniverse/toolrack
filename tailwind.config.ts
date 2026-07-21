import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#1C1F22",
          light: "#2A2E33",
        },
        gunmetal: "#33383D",
        concrete: {
          DEFAULT: "#EDEDE9",
          dark: "#DFDEDA",
        },
        safety: {
          DEFAULT: "#FFC72C",
          dark: "#E6A800",
        },
        steel: {
          DEFAULT: "#3E5C76",
          light: "#5A7A96",
        },
        readout: "#FFB100",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        pegboard:
          "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1.5px)",
      },
      backgroundSize: {
        pegboard: "16px 16px",
      },
    },
  },
  plugins: [],
};
export default config;