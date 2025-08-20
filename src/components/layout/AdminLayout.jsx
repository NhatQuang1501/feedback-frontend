import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { Lock, Home } from "@mui/icons-material";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Kiểm tra quyền admin
  const userRole = user?.role?.name;
  const isAdmin = userRole === "admin";

  // Nếu không phải admin, hiển thị trang từ chối
  if (!isAdmin) {
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
            Quyền yêu cầu: admin
            <br />
            Quyền hiện tại: {userRole || "Không xác định"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => window.location.href = "/feedbacks/"}
            className="bg-primary text-secondary hover:bg-primary-dark"
          >
            Về trang chủ
          </Button>
        </div>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
