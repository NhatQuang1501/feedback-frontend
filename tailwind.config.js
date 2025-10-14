/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffec99",
          main: "#ffec99",
          light: "#fff1b8",
          dark: "#e6d486",
          darker: "#c7a84b",
        },
        secondary: {
          DEFAULT: "#333333",
          main: "#333333",
          light: "#666666",
          dark: "#1a1a1a",
        },
        background: {
          default: "#fffef7",
          paper: "#ffffff",
        },
        text: {
          primary: "#333333",
          secondary: "#666666",
        },
        success: {
          DEFAULT: "#4caf50",
          main: "#4caf50",
        },
        error: {
          DEFAULT: "#f44336",
          main: "#f44336",
        },
        warning: {
          DEFAULT: "#ff9800",
          main: "#ff9800",
        },
        admin: {
          primary: "#2563eb",
          secondary: "#1e40af",
          accent: "#3b82f6",
        },
        status: {
          pending: "#f59e0b",
          processing: "#3b82f6",
          resolved: "#10b981",
          closed: "#6b7280",
        },
        info: {
          DEFAULT: "#0ea5e9",
          main: "#0ea5e9",
        },
        amber: {
          50: "#fff1b8",
          100: "#ffec99",
          200: "#f7e082",
          300: "#e6d486",
          400: "#c7a84b",
          500: "#b89b3e",
          900: "#713f12",
        },
      },
      fontFamily: {
        sans: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"],
      },
      textShadow: {
        DEFAULT: "1px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      height: {
        13: "3.25rem",
        14: "3.5rem",
      },
      minHeight: {
        96: "24rem",
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
          "borderColor": "#000000",
          "borderWidth": "2px",
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
            "boxShadow": "0 0 0 1px rgba(0, 0, 0, 0.1)",
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
