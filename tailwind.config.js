/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0a1610',
          gold: '#8dc63f',
          goldLight: '#a6e247',
          lime: '#8dc63f',
          limeLight: '#a6e247',
          green: '#162a1c',
          greenLight: '#234a32',
          forest: '#162a1c',
          forestDark: '#0e1d13',
          accent: '#8dc63f',
          textMuted: '#8da596',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
