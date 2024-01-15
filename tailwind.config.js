/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        main: "#00109E",
        active: "#23cee5",
        'main-white': '#f8f8f8',
        input: '#07141c',
        content: '#050713',
        'content-2': '#02040f',
        'content-3': '#040713',
        'content-4': '#06111e',
        success: '#20f174'

      }
    },
  },
  plugins: [],
}

