import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading while initializing
  if (!initialized) {
    return (
      <Box className="flex h-screen items-center justify-center">
        <div className="text-center">
          <CircularProgress className="text-primary mb-4" />
          <p className="text-gray-600">Đang kiểm tra xác thực...</p>
        </div>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
