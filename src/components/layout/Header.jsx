import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar position="static" color="default" elevation={0} className="bg-white shadow-md">
      <Container maxWidth="lg" className="mx-auto">
        <Toolbar className="flex justify-between px-4 py-3">
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className="text-primary-main hover:text-primary-dark text-[1.5rem] font-bold tracking-wide no-underline transition-colors duration-200 sm:text-[1.75rem]"
          >
            FeedbackHub
          </Typography>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Main Navigation */}
            <div className="hidden gap-6 sm:flex lg:gap-8">
              <Button
                component={Link}
                to="/feedback"
                variant="text"
                size="medium"
                className="relative font-medium normal-case"
                sx={{
                  color: isActive("/feedback") ? "#ffec99" : "#6b7280",
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "color 0.2s ease-in-out",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#ffec99",
                  },
                  "&::after": isActive("/feedback")
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#ffec99",
                      }
                    : {},
                }}
              >
                Phản hồi
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                variant="text"
                size="medium"
                className="relative font-medium normal-case"
                sx={{
                  color: isActive("/dashboard") ? "#ffec99" : "#6b7280",
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "color 0.2s ease-in-out",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#ffec99",
                  },
                  "&::after": isActive("/dashboard")
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#ffec99",
                      }
                    : {},
                }}
              >
                Dashboard
              </Button>
            </div>

            {/* Auth Separator */}
            <div className="hidden h-6 w-px bg-gray-300 sm:block"></div>

            {/* Auth Button */}
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              size="medium"
              className="rounded-lg bg-[#ffec99] px-5 py-2.5 text-sm font-semibold text-[#333333] normal-case shadow-md shadow-[#ffec99]/30 transition-all duration-200 ease-in-out hover:bg-[#e6d486] hover:shadow-lg hover:shadow-[#e6d486]/40 sm:px-6 sm:py-3 sm:text-base"
            >
              Đăng nhập
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
