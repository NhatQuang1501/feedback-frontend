// import { createTheme } from "@mui/material/styles";

// export const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2",
//       light: "#42a5f5",
//       dark: "#1565c0",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//     background: {
//       default: "#f5f5f5",
//       paper: "#ffffff",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 300,
//     },
//     h4: {
//       fontSize: "1.75rem",
//       "@media (max-width:600px)": {
//         fontSize: "1.5rem",
//       },
//     },
//     h5: {
//       fontSize: "1.5rem",
//       "@media (max-width:600px)": {
//         fontSize: "1.25rem",
//       },
//     },
//     body1: {
//       fontSize: "1rem",
//       "@media (max-width:600px)": {
//         fontSize: "0.875rem",
//       },
//     },
//     body2: {
//       fontSize: "0.875rem",
//       "@media (max-width:600px)": {
//         fontSize: "0.75rem",
//       },
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 960,
//       lg: 1280,
//       xl: 1920,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: 8,
//           fontWeight: 500,
//           transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
//           "&:hover": {
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
//           },
//         },
//         sizeLarge: {
//           padding: "12px 24px",
//           fontSize: "1rem",
//           "@media (max-width:600px)": {
//             padding: "10px 20px",
//             fontSize: "0.875rem",
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 8,
//             transition: "all 0.2s ease-in-out",
//             "&:hover": {
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#1976d2",
//               },
//             },
//             "&.Mui-focused": {
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderWidth: 2,
//                 borderColor: "#1976d2",
//               },
//             },
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           fontWeight: 500,
//           fontSize: "1rem",
//           "@media (max-width:600px)": {
//             fontSize: "0.875rem",
//           },
//         },
//       },
//     },
//     MuiContainer: {
//       styleOverrides: {
//         root: {
//           paddingLeft: 16,
//           paddingRight: 16,
//           "@media (max-width:600px)": {
//             paddingLeft: 8,
//             paddingRight: 8,
//           },
//         },
//       },
//     },
//   },
// });
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
