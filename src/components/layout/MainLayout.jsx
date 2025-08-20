import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import UserHeader from "@/components/layout/UserHeader";
import Footer from "@/components/layout/Footer";

const MainLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);


  const userRole = user?.role?.name;
  const isAdmin = userRole === "admin";

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
            onClick={() => window.location.href = "/admin/feedbacks"}
            className="bg-primary text-secondary hover:bg-primary-dark"
          >
            Về khu vực Admin
          </Button>
        </div>
      </Box>
    );
  }

  return (
    <div className="from-primary-light via-background-default to-secondary-light/10 flex min-h-screen flex-col bg-gradient-to-br">
      <UserHeader />
      <main className="flex-grow py-6 sm:py-8 lg:py-10">
        <div className="relative z-10 mx-auto px-2 sm:px-3 lg:px-4 max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
