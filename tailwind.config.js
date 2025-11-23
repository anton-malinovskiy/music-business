/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0fe',
          500: '#0c83eb',
          600: '#0066d4',
          700: '#0051ab',
        },
      },
    },
  },
  plugins: [],
}

