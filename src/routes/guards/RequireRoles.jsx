import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Lock, Home } from "@mui/icons-material";

const RequireRoles = ({ roles = [], children, fallbackPath = "/" }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, let ProtectedRoute handle it
  if (!isAuthenticated) {
    return children;
  }

  // Check if user has required role
  const userRole = user?.role?.name;
  const hasRequiredRole = roles.length === 0 || roles.includes(userRole);

  if (!hasRequiredRole) {
    // Show 403 Forbidden page instead of redirect
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Lock className="mx-auto mb-4 text-6xl text-gray-400" />
          <Typography variant="h4" className="mb-2 font-bold text-gray-900">
            Truy cập bị từ chối
          </Typography>
          <Typography variant="body1" className="mb-6 text-gray-600">
            Bạn không có quyền truy cập vào trang này.
            <br />
            Quyền yêu cầu: {roles.join(", ")}
            <br />
            Quyền hiện tại: {userRole || "Không xác định"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => {
              if (userRole === "admin") {
                window.location.href = "/admin/feedbacks/";
              } else {
                window.location.href = "/feedbacks/";
              }
            }}
            className="bg-primary text-secondary hover:bg-primary-dark"
          >
            Về trang chủ
          </Button>
        </div>
      </Box>
    );
  }

  return children;
};

export default RequireRoles;
