/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#EFF6EF',
        primary: '#245D33',
        secondary: '#A7ABAA',
        text: '#465357',
        footer: '#212122',
      },
      fontFamily: {
        sans: ['ui-sans-serif', '-apple-system', 'system-ui', 'Segoe UI', 'Helvetica', 'Apple Color Emoji', 'Arial', 'sans-serif', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
  },
  plugins: [],
}