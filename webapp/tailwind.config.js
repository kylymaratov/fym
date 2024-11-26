/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '##0f0f0f',
        secondary: '#141414',
      },
    },
  },
  plugins: [],
};
