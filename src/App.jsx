import React from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "@/theme";
import AuthPage from "@/pages/auth/AuthPage";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <CssBaseline />
        <AuthPage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
