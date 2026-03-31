/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ⬅️ חובה!
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
      },

      // במקום צבעים קשיחים → משתמשים ב־CSS variables
      colors: {
        bg: {
          base: "var(--bg-base)",
          card: "var(--bg-card)",
          hover: "var(--bg-hover)",
          border: "var(--bg-border)",
        },
        text: {
          base: "var(--text-base)",
        },
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },

      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.07)',
        glow: '0 0 20px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [],
}
