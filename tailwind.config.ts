import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        cyan: {
          glow: "#22d3ee",
        },
        pink: {
          glow: "#f472b6",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 4s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.35)",
        "glow-sm": "0 0 20px rgba(99,102,241,0.2)",
        "glow-cyan": "0 0 30px rgba(34,211,238,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
