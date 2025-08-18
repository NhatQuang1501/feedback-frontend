import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
} from "@mui/material";
import { Login, PersonAdd } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = ({
  onLogin,
  onRegister,
  onGoogleLogin,
  loginLoading = false,
  registerLoading = false,
  loginError = null,
  registerError = null,
  onClearError,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // Clear error when switching tabs
    if (onClearError) {
      onClearError();
    }
  };

  const switchToRegister = () => {
    setCurrentTab(1);
    if (onClearError) {
      onClearError();
    }
  };

  const switchToLogin = () => {
    setCurrentTab(0);
    if (onClearError) {
      onClearError();
    }
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`auth-tabpanel-${index}`}
        aria-labelledby={`auth-tab-${index}`}
        className={`transition-opacity duration-300 ease-in-out ${
          value === index ? "opacity-100" : "opacity-0"
        }`}
        {...other}
      >
        {value === index && (
          <Box
            sx={{
              pt: { xs: 2, sm: 3 },
              minHeight: currentTab === 0 ? 400 : 600,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          className="text-shadow mb-2 text-[1.75rem] leading-tight font-bold text-[#ffec99] sm:text-[2.25rem] md:text-[2.75rem]"
        >
          Feedback Hub
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className="mx-auto mb-3 max-w-xl text-[0.9rem] leading-relaxed text-gray-600 sm:text-[1rem]"
        >
          Hệ thống quản lý phản hồi người dùng
        </Typography>
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#ffec99]"></div>
      </div>

      <Paper
        elevation={6}
        className="overflow-hidden rounded-2xl border border-[#fff1b8]/30 bg-gradient-to-br from-white to-[#fffef7] shadow-lg transition-all duration-300 ease-in-out"
      >
        <Card
          sx={{
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 500,
                  minHeight: { xs: 56, sm: 64 },
                  padding: { xs: "8px 12px", sm: "12px 16px" },
                  color: "#6b7280",
                  "&:hover": {
                    backgroundColor: "rgba(255, 236, 153, 0.04)",
                    color: "#374151",
                  },
                  "&.Mui-selected": {
                    fontWeight: 600,
                    color: "#374151",
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  backgroundColor: "#ffec99",
                },
                "& .MuiTabs-flexContainer": {
                  height: { xs: 56, sm: 64 },
                },
              }}
            >
              <Tab
                icon={<Login sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, color: "inherit" }} />}
                label="Đăng Nhập"
                id="auth-tab-0"
                aria-controls="auth-tabpanel-0"
                iconPosition={isMobile ? "top" : "start"}
              />
              <Tab
                icon={
                  <PersonAdd sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, color: "inherit" }} />
                }
                label="Đăng Ký"
                id="auth-tab-1"
                aria-controls="auth-tabpanel-1"
                iconPosition={isMobile ? "top" : "start"}
              />
            </Tabs>
          </Box>

          <CardContent className="p-6 sm:p-8 lg:p-10">
            <TabPanel value={currentTab} index={0}>
              <LoginForm
                onLogin={onLogin}
                onGoogleLogin={onGoogleLogin}
                loading={loginLoading}
                error={loginError}
                onSwitchToRegister={switchToRegister}
                onClearError={onClearError}
              />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <RegisterForm
                onRegister={onRegister}
                onGoogleLogin={onGoogleLogin}
                loading={registerLoading}
                error={registerError}
                onSwitchToLogin={switchToLogin}
                onClearError={onClearError}
              />
            </TabPanel>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default AuthTabs;
