// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B46C1',
          dark: '#553C9A',
        },
        secondary: {
          DEFAULT: '#805AD5',
        },
      },
    },
  },
  plugins: [],
}
