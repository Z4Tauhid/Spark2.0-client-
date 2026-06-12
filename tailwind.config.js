/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spark: {
          DEFAULT: '#1a2744',
          dark:    '#111b33',
          light:   '#243358',
        },
        orange: {
          spark: '#E85D26',
          light: '#f07142',
          dark:  '#c44d1c',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}