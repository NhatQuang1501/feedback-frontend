import React from "react";
import { ThemeProvider, CssBaseline, Container, Typography } from "@mui/material";
import { theme } from "@/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Feedback Application
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ready for development
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
