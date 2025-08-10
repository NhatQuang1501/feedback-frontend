import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const UserHeader = () => {
  const location = useLocation();

  const isActive = (path) => {
    // Xử lý đặc biệt cho /feedbacks và /feedbacks/create
    if (path === "/feedbacks") {
      return (
        location.pathname === "/feedbacks" ||
        (location.pathname.startsWith("/feedbacks") &&
          !location.pathname.startsWith("/feedbacks/create"))
      );
    }
    if (path === "/feedbacks/create") {
      return location.pathname === "/feedbacks/create";
    }
    // Xử lý các trường hợp khác
    return location.pathname.startsWith(path);
  };

  const navigationItems = [
    {
      label: "Gửi phản hồi",
      path: "/feedbacks/create",
    },
    {
      label: "Quản lý feedback",
      path: "/feedbacks",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <AppBar position="static" color="default" elevation={0} className="bg-white shadow-md">
      <Container maxWidth="lg" className="mx-auto">
        <Toolbar className="flex px-4 py-3">
          {/* Logo & Brand */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className="text-primary hover:text-primary-dark mr-8 text-[1.5rem] font-bold tracking-wide no-underline transition-colors duration-200 sm:text-[1.75rem]"
          >
            FeedbackHub
          </Typography>

          {/* Main Navigation - Now on the left */}
          <div className="hidden gap-6 sm:flex lg:gap-8">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant="text"
                size="medium"
                className={`relative font-medium normal-case transition-colors duration-200 hover:bg-transparent ${
                  isActive(item.path)
                    ? "text-primary after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full"
                    : "hover:text-primary text-gray-500"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Spacer to push the right items to the end */}
          <div className="flex-grow"></div>

          {/* Right side items */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Auth Separator */}
            <div className="hidden h-6 w-px bg-gray-300 sm:block"></div>

            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              size="medium"
              className="bg-primary text-secondary shadow-primary/30 hover:bg-primary-dark hover:shadow-primary-dark/40 rounded-lg px-5 py-2.5 text-sm font-semibold normal-case shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:px-6 sm:py-3 sm:text-base"
            >
              Đăng nhập
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserHeader;
