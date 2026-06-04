/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        canvas: "#f7f7f4",
        "canvas-soft": "#fafaf7",
        "surface-card": "#ffffff",
        "surface-strong": "#e6e5e0",
        hairline: "#e6e5e0",
        "hairline-soft": "#efeee8",
        "hairline-strong": "#cfcdc4",
        ink: "#26251e",
        body: "#5a5852",
        muted: "#807d72",
        "muted-soft": "#a09c92",
        primary: "#f54e00",
        "primary-active": "#d04200",
        "timeline-thinking": "#dfa88f",
        "timeline-grep": "#9fc9a2",
        "timeline-read": "#9fbbe0",
        "timeline-edit": "#c0a8dd",
        "timeline-done": "#c08532",
        "semantic-success": "#1f8a65",
        "semantic-error": "#cf2d56",
        "brand-gray": "#1A1A1A",
        "neon-green": "#D5FF40",
        "stone": "#C0C2B8",
        "dark-bg": "#0A0A0A",
      }
    },
  },
  plugins: [],
}