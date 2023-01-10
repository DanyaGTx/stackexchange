/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        link: '#366FB3',
      },
      boxShadow: {
        'box-shadow-element': '0px 4px 6px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
