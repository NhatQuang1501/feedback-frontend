/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#ffec99",
          light: "#fff1b8",
          dark: "#e6d486",
        },
        secondary: {
          main: "#333333",
          light: "#666666",
          dark: "#1a1a1a",
        },
        background: {
          default: "#fffef7",
          paper: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"],
      },
      textShadow: {
        DEFAULT: "1px 1px 2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  important: "#root", // or true
  // Avoid conflict with MUI
  corePlugins: {
    preflight: false,
  },
};
