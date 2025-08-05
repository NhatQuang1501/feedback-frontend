import React from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "@/theme";
import FeedbackPage from "@/pages/feedback/FeedbackPage";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <CssBaseline />
        <FeedbackPage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
