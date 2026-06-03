import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          2: "#1B2A48",
          3: "#0a0f1c",
          4: "#1E293B",
        },
        orange: {
          DEFAULT: "#F97316",
          2: "#F26B1F",
          soft: "#FFEDD5",
          deep: "#C2410C",
          bright: "#FB923C",
        },
        offwhite: "#F8FAFC",
        ink: "#1E293B",
        muted: "#64748B",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 4px 16px -6px rgba(15, 23, 42, 0.12)",
        cta: "0 8px 24px -8px rgba(249, 115, 22, 0.55)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
