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
        sans: ["var(--font-inter)", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SF Mono", "Menlo", "monospace"],
        // legacy aliases kept for dashboard/builder compatibility
        poppins: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-inter)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        // ── Linear Surface Ladder ──
        canvas: "#010102",
        "surface-1": "#0d0e11",
        "surface-2": "#13151a",
        "surface-3": "#1a1d24",
        "surface-4": "#20242d",
        // ── Borders ──
        hairline: "#23252a",
        "hairline-strong": "#2e3138",
        "hairline-tertiary": "#363a45",
        // ── Brand Accent ──
        primary: "#5e6ad2",
        "primary-hover": "#828fff",
        "primary-focus": "#5e69d1",
        "brand-secure": "#7a7fad",
        // ── Text ──
        ink: "#f7f8f8",
        "ink-muted": "#d0d6e0",
        "ink-subtle": "#8a8f98",
        "ink-tertiary": "#62666d",
        // ── Semantic ──
        "semantic-success": "#27a644",
        // ── Legacy ──
        "brand-gray": "#1a1a1a",
        "dark-bg": "#010102",
        // ── Timeline (dashboard) ──
        "timeline-thinking": "#dfa88f",
        "timeline-grep": "#9fc9a2",
        "timeline-read": "#9fbbe0",
        "timeline-edit": "#c0a8dd",
        "timeline-done": "#c08532",
        "semantic-error": "#cf2d56",
      },
      letterSpacing: {
        "display-xl": "-0.0375em",  // ~-3px at 80px
        "display-lg": "-0.032em",   // ~-1.8px at 56px
        "display-md": "-0.025em",   // ~-1px at 40px
        "headline": "-0.021em",     // ~-0.6px at 28px
        "card-title": "-0.018em",   // ~-0.4px at 22px
        "eyebrow": "0.03em",        // +0.4px positive
      },
      fontSize: {
        "display-xl": ["80px", { lineHeight: "1.05", letterSpacing: "-0.0375em" }],
        "display-lg": ["56px", { lineHeight: "1.10", letterSpacing: "-0.032em" }],
        "display-md": ["40px", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        headline: ["28px", { lineHeight: "1.20", letterSpacing: "-0.021em" }],
        "card-title": ["22px", { lineHeight: "1.25", letterSpacing: "-0.018em" }],
        subhead: ["20px", { lineHeight: "1.40", letterSpacing: "-0.01em" }],
        "body-lg": ["18px", { lineHeight: "1.50", letterSpacing: "-0.005em" }],
        "body-sm": ["14px", { lineHeight: "1.50", letterSpacing: "0" }],
        eyebrow: ["13px", { lineHeight: "1.30", letterSpacing: "0.03em" }],
        caption: ["12px", { lineHeight: "1.40", letterSpacing: "0" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
}