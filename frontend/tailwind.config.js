/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E2E24',
        'primary-dark': '#2E231D',
        'primary-light': '#5D473A',
        secondary: '#D8C3A5',
        'secondary-dark': '#AE9A7F',
        'secondary-light': '#EEDDC5',
        'brand-dark': '#1C1B1A',
        'brand-light': '#F5F1EB',
      },
      fontFamily: {
        japanese: ['"Sawarabi Mincho"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

