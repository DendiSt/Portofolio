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
          black: '#0f172a', /* slate-900 */
          dark: '#1e293b', /* slate-800 */
          cyan: '#3b82f6', /* blue-500 */
          purple: '#2563eb', /* blue-600 */
          blue: '#1d4ed8', /* blue-700 */
        }
      },
      boxShadow: {
        'neon-cyan': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'neon-purple': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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