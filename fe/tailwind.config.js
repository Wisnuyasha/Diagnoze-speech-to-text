/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dbg: '#F7F5FF',
        dpurple: '#45486E',
        dblack: '#343434',
        dgrey: '#B8B8C1',
        dboxdet: '#F5F5F5', //buat kotak di item details
        dred: '#BD2B23',
        dblue: '#2733C7',
        dgreen: '#198961',
        dline: '#D1D1D1'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
