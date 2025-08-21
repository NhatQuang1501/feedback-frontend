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
      fontWeight: 700,
      color: "#333333",
    },
    h2: {
      fontWeight: 700,
      color: "#333333",
    },
    h3: {
      fontWeight: 700,
      color: "#333333",
    },
    h4: {
      fontWeight: 600,
      color: "#333333",
    },
    h5: {
      fontWeight: 600,
      color: "#333333",
    },
    h6: {
      fontWeight: 600,
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
          boxShadow: "none",
        },
        containedPrimary: {
          "backgroundColor": "#ffec99",
          "color": "#333333",
          "&:hover": {
            backgroundColor: "#e6d486",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        outlined: {
          "borderWidth": "1px",
          "&:hover": {
            borderWidth: "1px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "borderRadius": "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffec99",
              borderWidth: "2px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e6d486",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "borderRadius": "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffec99",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e6d486",
            borderWidth: "2px",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});
