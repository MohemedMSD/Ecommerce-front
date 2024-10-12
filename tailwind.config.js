/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#dcdcdc", // dcdcdc
        second: "#22c55e", // f02d34
        primary_text : "#2F5271", // 324d67
      }, //fade00
    },
  },
  plugins: [],
}

