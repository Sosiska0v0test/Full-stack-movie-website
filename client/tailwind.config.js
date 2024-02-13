/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // customize colors and fonts
  theme: {
    extend: {
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        sx: '475px',
      },
      colors: {
        main: '#0a0908', // 0a0908
        subMain: '#1D7159', //eb5e28  0F4C5C   1F7A8C  1D7159
        dry: '#141414',
        star: '#FFB000',
        text: '#C0C0C0',
        borderSearch: '#FDECEF',
        border: '#FDECEF',
        dryGray: '#FDECEF',
        placeholder: '#525354',
        delete: '#d90429',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

