/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/index.css",
  ],
  safelist:[
    'bg-blue-600',
    'ring-blue-500'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Add Inter font.
      },
      colors: {
        'primary': '#6366F1', // Custom primary color
        'secondary': '#374151', // Custom secondary color
      },
    },
  },
  darkMode: false,
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
