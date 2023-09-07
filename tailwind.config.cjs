/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        link: '#366FB3',
        mainLightGray: '#ECEEF0',
        mainGray: '#8B949D',
        mainDarkest: '#151515',
        accentSun: '#FFD842',
        accentSunHover: '#FCBB0A',
      },
      fontFamily: {
        FivoSans: ['FivoSans'],
      },
      boxShadow: {
        'box-shadow-element':
          '0px 2px 8px 0px rgba(0, 0, 0, 0.05), 0px 1px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
