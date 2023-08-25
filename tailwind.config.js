/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        standardBlack: '#262626',

        majorAC: '#93c5fd',
        majorBC: '#f97316',
        majorCG: '#f97316',
        majorFL: '#dc2626',
        majorHT: '#1e40af',
        majorIT: '#7c3aed',
        majorMK: '#93c5fd',
        majorTS: '#1e40af'
      },
    },
  },
  plugins: [],
}

