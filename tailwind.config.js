/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        emerald: '#185A43',
        sage: '#7E9F8E',
        mint: '#A3D9C9',
        gold: '#DFB461',
      },
    },
  },
  plugins: [],
};