/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#171717',
        secondary: '#212121',
        lightGray: '#3c3c3c',
        blueGray: '#29343c',
        darkGray: '#1d1d1d',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
    plugins: [],
  },
};
