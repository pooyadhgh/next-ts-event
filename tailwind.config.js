module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#333F63',
        secondary: '#715C8C',
        tertiary: '#838BC2',
        quaternary: '#D7D4DD',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
