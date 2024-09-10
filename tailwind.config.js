/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    // colors: {
    //   primary: '#C9DABF',
    //   secondary: '#9CA986',
    //   dark: '#2C3333',//808D7C
    //   secondaryDark: '#5F6F65',
    //   black: '#2C3333',//121212
    //   white: '#fafafa',
    //   transparent: 'rgba(0,0,0,0)',
    //   darkPrimary: '#2C3333',
    //   darkSecondary: '#395B64',
    //   darkWhite: '#A5C9CA',
    //   darkSecondary: '#E7F6F2'
    // },
    extend: {
      colors: {
        primary: '#C9DABF',
        secondary: '#9CA986',
        dark: '#2C3333',//808D7C //2C3333
        light: '#eee',
        secondaryDark: '#5F6F65',
        black: '#121212',//121212
        white: '#fafafa',
        transparent: 'rgba(0,0,0,0)',
        darkPrimary: '#808D7C',
        darkSecondary: '#395B64',
        darkWhite: '#A5C9CA',
        darkSecondary: '#E7F6F2'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
