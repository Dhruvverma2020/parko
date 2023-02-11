/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./screens/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
        colors: {
            "blue-custom": {
                1: "#007dff",
                2: "#2d36b9"
            }
        }
    },
  },
  plugins: [],
}
