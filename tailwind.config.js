/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: ['./app/**/*.{js,ts,tsx}', './Components/**/*.{js,ts,tsx}', './Hooks/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0F172A',
        },
      },
    },
  },
  plugins: [],
};

