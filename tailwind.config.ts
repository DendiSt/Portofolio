import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Contra Design Tokens mapped to CSS variables (dynamic light & dark mode)
        ink: {
          DEFAULT: 'var(--color-ink)',
          deep: 'var(--color-deep-ink)',
        },
        paper: 'var(--color-paper)',
        mist: 'var(--color-mist)',
        hairline: 'var(--color-hairline)',
        slate: {
          DEFAULT: 'var(--color-slate)',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        fog: 'var(--color-fog)',
        graphite: 'var(--color-graphite)',
        charcoal: 'var(--color-charcoal)',
        'deep-ink': 'var(--color-deep-ink)',
        pearl: 'var(--color-pearl)',
        iris: '#6a57e3',
        lilac: '#ddd8ff',
        orchid: '#cd74dd',
        wine: '#45192f',
        coral: '#ff5a5e',
        lime: '#f0fb96',
        'hero-wash': '#9ddef9',

        // Backwards compatibility for cyber-* classes mapped to Contra palette
        cyber: {
          black: '#14171f',
          dark: '#222834',
          cyan: '#222834',
          purple: '#6a57e3',
          blue: '#14171f',
        }
      },
      borderRadius: {
        cards: '4px',
        inputs: '10px',
        nav: '16px',
        buttons: '24px',
        tags: '32px',
        largepills: '40px',
      },
      boxShadow: {
        'contra-md': 'rgba(34, 40, 52, 0.05) 0px 4px 10px 0px, rgba(34, 40, 52, 0.04) -2px 18px 18px 0px',
        'contra-subtle': 'rgb(19, 24, 25) 0px 1px 3px 0px inset',
        'contra-lg': 'rgba(0, 0, 0, 0.05) 0px 10px 20px 0px',
        'neon-cyan': 'rgba(34, 40, 52, 0.05) 0px 4px 10px 0px, rgba(34, 40, 52, 0.04) -2px 18px 18px 0px',
        'neon-purple': 'rgba(0, 0, 0, 0.05) 0px 10px 20px 0px',
      },
      maxWidth: {
        'contra': '1200px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1) translate(-50%, -50%)' },
          '100%': { opacity: '0', transform: 'scale(0) translate(-50%, -50%)' },
        }
      },
      animation: {
        'fade-out': 'fadeOut 2s ease-out forwards',
      }
    },
  },
  plugins: [],
} satisfies Config;