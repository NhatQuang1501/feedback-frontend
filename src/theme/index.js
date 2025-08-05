import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffec99",
      light: "#fff1b8",
      dark: "#e6d486",
      contrastText: "#333333",
    },
    secondary: {
      main: "#333333",
      light: "#666666",
      dark: "#1a1a1a",
      contrastText: "#ffffff",
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
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      // fontWeight: 500,
      color: "#333333",
    },
    h2: {
      // fontWeight: 500,
      color: "#333333",
    },
    h3: {
      // fontWeight: 500,
      color: "#333333",
    },
    h4: {
      // fontWeight: 500,
      color: "#333333",
    },
    h5: {
      // fontWeight: 500,
      color: "#333333",
    },
    h6: {
      // fontWeight: 500,
      color: "#333333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: "#ffec99",
          color: "#333333",
          "&:hover": {
            backgroundColor: "#e6d486",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#ffec99",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#e6d486",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffec99",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e6d486",
          },
        },
      },
    },
  },
});
