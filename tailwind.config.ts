import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f0",
        card: "#111111",
        muted: "#1c1c1c",
        border: "#2f2f2f",
        gold: "#d6a84f",
        "gold-soft": "#f2d28a"
      },
      boxShadow: {
        glow: "0 0 40px rgba(214, 168, 79, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
