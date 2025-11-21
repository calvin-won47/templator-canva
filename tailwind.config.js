
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canva-purple': '#8d33ff',
        'canva-blue': '#3355ff',
      },
      fontFamily: {
        sans: ['"Canva Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
  