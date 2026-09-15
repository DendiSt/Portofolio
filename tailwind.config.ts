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
        cyber: {
          black: '#050510',
          dark: '#0a0a20',
          cyan: '#00f3ff',
          purple: '#bc13fe',
          blue: '#0066ff',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 243, 255, 0.5)',
        'neon-purple': '0 0 15px rgba(188, 19, 254, 0.5)',
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