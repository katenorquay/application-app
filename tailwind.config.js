
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ...colors
    },
    },
  },
  plugins: [],
}

