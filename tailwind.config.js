/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A8A',   // Custom primary brand color
          secondary: '#E11D48', // Custom secondary brand color
          accent: '#10B981',    // Custom accent color
        },
        neutral: {
          dark: '#111827',      // Dark background color
          light: '#F3F4F6',     // Light background color
        },
      },
      fontFamily: {
        brand: ['"Open Sans"', 'sans-serif'], // Custom brand font
        heading: ['"Poppins"', 'sans-serif'], // Font for headings
      },
      fontSize: {
        base: '16px',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

