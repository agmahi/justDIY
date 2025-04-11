module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css", 
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
  ],
}
