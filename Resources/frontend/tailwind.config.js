/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          yellow: '#FCD34D', // kiri atas
          orange: '#FCA5A5', // tengah atas
          green: '#D9F99D',  // kanan atas
          purple: '#C4B5FD', // kiri bawah
          blue: '#7DD3FC',   // kanan bawah
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // clean font
      }
    },
  },
  plugins: [],
}