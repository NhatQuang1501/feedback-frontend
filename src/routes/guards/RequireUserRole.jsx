import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { Lock, AdminPanelSettings } from "@mui/icons-material";

const RequireUserRole = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  // If not authenticated, let ProtectedRoute handle it
  if (!isAuthenticated) {
    return children;
  }

  // If admin tries to access user routes, show access denied
  if (isAdmin) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AdminPanelSettings className="mx-auto mb-4 text-6xl text-blue-400" />
          <Typography variant="h4" className="mb-2 font-bold text-gray-900">
            Khu vực dành cho người dùng
          </Typography>
          <Typography variant="body1" className="mb-6 text-gray-600">
            Bạn đang đăng nhập với quyền Admin.
            <br />
            Khu vực này chỉ dành cho người dùng thường.
            <br />
            Vui lòng sử dụng khu vực quản trị để thực hiện các tác vụ admin.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AdminPanelSettings />}
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="bg-primary text-secondary hover:bg-primary-dark"
          >
            Về khu vực Admin
          </Button>
        </div>
      </Box>
    );
  }

  return children;
};

export default RequireUserRole;