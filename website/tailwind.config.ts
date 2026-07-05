import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      colors: {
        bg0: "var(--bg-0)",
        bg1: "var(--bg-1)",
        surface: "var(--surface)",
        gold: "var(--gold)",
        text: "var(--text)",
        muted: "var(--muted)",
      },
      boxShadow: {
        luxury: "0 0 0 1px rgba(200,162,74,0.18), 0 10px 30px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;

