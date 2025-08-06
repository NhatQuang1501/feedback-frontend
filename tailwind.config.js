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
        yellow: {
          400: "#facc15", // Màu vàng chính cho buttons
          300: "#fde047", // Màu vàng hover
          500: "#eab308", // Màu vàng đậm hơn nếu cần
        },
      },
      fontFamily: {
        sans: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"],
      },
      textShadow: {
        DEFAULT: "1px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      height: {
        13: "3.25rem", // 52px for buttons
        14: "3.5rem", // 56px for inputs
      },
      minHeight: {
        96: "24rem", // 384px
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        },
        ".input-black-border": {
          borderColor: "#000000",
          borderWidth: "2px",
          "&:hover": {
            borderColor: "#000000",
          },
          "&:focus": {
            borderColor: "#000000",
            outline: "none",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
          },
        },
        ".btn-hover": {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
        ".btn-active": {
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      };

      const newComponents = {
        ".form-field-black": {
          "@apply w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-base font-normal transition-all duration-200 ease-in-out":
            {},
          "&:hover": {
            "@apply border-black": {},
          },
          "&:focus": {
            "@apply border-black outline-none": {},
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
          },
          "&.error": {
            "@apply border-red-500": {},
          },
        },
        ".btn-yellow": {
          "@apply h-13 w-full rounded-lg bg-yellow-400 text-black font-semibold text-base shadow-md border-2 border-black transition-all duration-200 ease-in-out":
            {},
          "&:hover": {
            "@apply bg-yellow-300 shadow-lg -translate-y-0.5": {},
          },
          "&:active": {
            "@apply translate-y-0 shadow-md": {},
          },
          "&:disabled": {
            "@apply bg-gray-300 text-gray-500 shadow-none transform-none cursor-not-allowed border-gray-400":
              {},
          },
        },
        ".btn-white-black-border": {
          "@apply h-13 w-full rounded-lg border-2 border-black bg-white text-black font-medium text-base transition-all duration-200 ease-in-out":
            {},
          "&:hover": {
            "@apply bg-gray-50 shadow-md -translate-y-0.5": {},
          },
          "&:active": {
            "@apply translate-y-0 shadow-sm": {},
          },
          "&:disabled": {
            "@apply border-gray-400 bg-gray-100 text-gray-400 transform-none cursor-not-allowed":
              {},
          },
        },
      };

      addUtilities(newUtilities);
      addComponents(newComponents);
    },
  ],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
