/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      accent: ['Open Sans', 'Verdana', 'Tahoma', 'sans-serif'],
      sans: ['sans-serif', 'Helvetica', 'Arial'],
      boldy: ['Helvetica-Bold', 'Arial Black', 'Arial Bold', 'Gadget', 'sans-serif'],
      rating: ['Courier', 'monospace'],
    },
    fontSize: {
      sm: ['13px', '18px'],
      base: ['14px', '20px'],
      lg: ['16px', '24px'],
      xl: ['24px', '32px'],
    },
    extend: {
      colors: {
        'off-white': '#f7f8f9',
        'pale-gray': '#e8ebee',
        'light-gray': '#c2cad0',
        'med-gray': '#61696e',
        'dark-gray': '#8d989e',
        'darker-gray': '#303436',
        'sky-blue': '#1a72b0',
        'dark-brown': '#5c3700'
      },
      borderRadius: {
        '1xl': '8px'
      },
    },
  },
  plugins: [],
}