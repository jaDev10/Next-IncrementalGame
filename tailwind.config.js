/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        // backgroundMain: '#41B3A3',
        // buttonMain: '#E27D60',
        // buttonClicked: '#d04c26',
        // purpleish: '#C38D9E'
        backgroundMain: '#1A1A1D',
        buttonMain: '#C3073F',
        buttonClicked: '#6F2232',
        purpleish: '#950740',
        grayish: '#4E4E50'
      }
    },
  },
  plugins: [],
}
