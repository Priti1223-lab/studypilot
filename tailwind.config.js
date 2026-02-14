/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "var(--accent)",
        secondary: "var(--accent)",
        accent: "var(--accent)",
        danger: "#ef4444",

        bg: "var(--bg)",
        card: "var(--card)",
        borderc: "var(--borderc)",
        textc: "var(--text)"
      },

      boxShadow: {
        soft: "0 0 25px rgba(34,197,94,0.15)",
        redglow: "0 0 15px rgba(239,68,68,0.35)"
      }
    }
  },

  plugins: []
};
