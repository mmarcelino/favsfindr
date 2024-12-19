/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F15156',
          light: '#F3686C',
          dark: '#D13F44'
        }
      }
    },
  },
  plugins: [],
};