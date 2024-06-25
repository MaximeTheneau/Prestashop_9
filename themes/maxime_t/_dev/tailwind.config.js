/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    '../templates/*.tpl',
    './modules/**/*.tpl',
    './css/**/*.scss',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
