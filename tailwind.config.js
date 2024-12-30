/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b",
          "950": "#09090b"
        },
        allFontColor: "#324B11",
        homePage: "#0C3937",
        headerBackGround: "#FFFDF6",
        homePagedes: "#D5A842",
        slide: "#F9D8A6",
        primaryHover: "#3f3f46", // Added for hover states
       
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
        avenir: ['AvenirLight', 'sans-serif'],
        forumNormal:['Quicksand','serif'],
        body: [
          'Source Sans Pro', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ],
      },
      fontWeight: {
        100: "100",
        400: "400",
        500: "500", // Added for medium weight
        600: "600", // Added for bold weight
      },
    },
  },
  plugins: [],
}
