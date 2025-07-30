/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A3426',
        secondary: '#D8C3A5',
        'brand-dark': '#1C1B1A',
        'brand-light': '#F5F1EB',
      },
    },
  },
  plugins: [],
}

