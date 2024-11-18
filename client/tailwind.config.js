/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111828',
        secondary: '#384152',
      },
      keyframes: {
        starfall: {
          '0%': { transform: 'translate(0, 0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translate(-150vw, 150vh)', opacity: '0' },
        },
      },
      animation: {
        starfall: 'starfall linear infinite',
      },
    },
  },
  plugins: [],
};
