import type { Config } from "tailwindcss";

/**
 * Design tokens for The Green Peace School.
 * ------------------------------------------------------------------
 * All brand colours live here so the whole site can be re-themed in
 * one place. Usage rules (see the design brief):
 *  - `background` (warm cream) is the page background; cards use white
 *    or the slightly darker cream (`background-dark`).
 *  - `primary` (deep forest green) is for the navbar, footer,
 *    headings and section accents.
 *  - `accent` (soft gold) is ONLY for key action buttons (Apply Now,
 *    Register, Submit, Enquire) and small highlights. Buttons on gold
 *    use dark-green text for readable contrast.
 *  - `text` is a green-tinted near-black; `text-muted` is secondary.
 *  - `line` is the subtle light green-grey border colour.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Forest Green — the brand colour (with light/dark shades).
        primary: {
          DEFAULT: "#1E4D2B",
          50: "#F1F6F2",
          100: "#E0EBE2",
          200: "#C3D9CB",
          300: "#9BBFA5",
          400: "#6C9C7B",
          500: "#467A57",
          600: "#2F5F3E",
          700: "#1E4D2B",
          800: "#173C22",
          900: "#122F1C",
          950: "#0B1F12",
          // Convenience aliases used across the components.
          light: "#2F5F3E", // hover shade (lighter)
          dark: "#122F1C", // darker shade
        },
        // Warm cream / ivory — the page background.
        background: {
          DEFAULT: "#FAF6EE",
          dark: "#F2ECDF", // slightly darker cream for alternating sections
          deep: "#EAE2D0",
        },
        // Soft gold — key actions & small highlights only.
        accent: {
          DEFAULT: "#D4AF37",
          hover: "#BE9A2C", // darker gold for hover
          deep: "#8A6C1E", // dark gold for small text (passes AA on cream)
          soft: "#F6EDD4",
        },
        // Green-tinted near-black body text + muted secondary text.
        text: {
          DEFAULT: "#1B2A20",
          muted: "#5B6B60",
        },
        // Subtle light green-grey borders.
        line: "#DEE6DC",
      },
      fontFamily: {
        // Wired up by next/font in app/layout.tsx (--font-serif / --font-sans).
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(27 42 32 / 0.05), 0 4px 16px -4px rgb(27 42 32 / 0.08)",
        lift: "0 2px 4px 0 rgb(27 42 32 / 0.06), 0 12px 28px -8px rgb(27 42 32 / 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
