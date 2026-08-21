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
          bg: '#050a07',
          gold: '#c9aa58',
          goldLight: '#e6cd85',
          green: '#0f3d23',
          greenLight: '#185d37',
          accent: '#8fa83b',
          textMuted: '#a2b3a8',
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
