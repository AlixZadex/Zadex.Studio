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
        background: "#f8fafc",
        surface: "#ffffff",
        panel: "#f1f5f9",
        border: "rgba(15, 23, 42, 0.10)",
        muted: "#526173",
        accent: {
          DEFAULT: "#0084ff",
          dim: "rgba(0, 132, 255, 0.12)",
          violet: "#7c3aed",
          blue: "#2563eb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,6vw,5.85rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.15rem,4vw,3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
      },
      animation: {
        "gradient-shift": "gradient-shift 14s ease infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
