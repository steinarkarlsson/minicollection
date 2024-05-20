/** @type {import('tailwindcss').Config} */
const scrollbar = require('tailwind-scrollbar');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
      scrollbar
  ],
}
