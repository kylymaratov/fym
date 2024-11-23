import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '##0f0f0f',
        secondary: '#141414',
      },
    },
  },
  plugins: [],
} satisfies Config;
