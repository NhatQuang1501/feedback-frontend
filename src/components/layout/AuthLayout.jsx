import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box className="from-primary-light via-background-default to-secondary-light/10 flex min-h-screen items-center justify-center bg-gradient-to-br">
      <Container maxWidth="sm" className="py-8">
        <Box className="rounded-lg bg-white p-6 shadow-lg">
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
