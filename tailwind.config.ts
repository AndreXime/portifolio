export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#2563eb",
        primaryDark: "#1d4ed8",
        secondary: "#7c3aed",
        background: "#f8fafc",
        surface: "#ffffff",
        surfaceHighlight: "#f1f5f9",
        textMain: "#0f172a",
        textMuted: "#64748b",
        border: "#e2e8f0",
      },
      animation: {
        float: "float 3s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
