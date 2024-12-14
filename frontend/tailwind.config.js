/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f',
        secondary: '#101010',
        hover: '#1f1f1f',
      },
    },
  },
  plugins: [],
};
