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
} from "@mui/material";
import { Login, PersonAdd } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = ({
  onLogin,
  onRegister,
  loginLoading = false,
  registerLoading = false,
  loginError = null,
  registerError = null,
}) => {
  // ==================== STATE ====================
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ==================== HANDLERS ====================
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const switchToRegister = () => {
    setCurrentTab(1);
  };

  const switchToLogin = () => {
    setCurrentTab(0);
  };

  // ==================== COMPONENTS ====================
  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`auth-tabpanel-${index}`}
        aria-labelledby={`auth-tab-${index}`}
        {...other}
        style={{
          transition: "opacity 0.3s ease-in-out",
          opacity: value === index ? 1 : 0,
        }}
      >
        {value === index && (
          <Box
            sx={{
              paddingTop: { xs: 2, sm: 3 },
              minHeight: currentTab === 0 ? "400px" : "600px",
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

  // ==================== RENDER ====================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: { xs: 1, sm: 2 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: 480,
              md: 520,
            },
            minWidth: {
              xs: 280,
              sm: 400,
            },
            boxShadow: {
              xs: 1,
              sm: 3,
              md: 4,
            },
            borderRadius: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            overflow: "hidden",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            contain: "layout style paint",
          }}
        >
          {/* ==================== HEADER ==================== */}
          <Box
            sx={{
              textAlign: "center",
              paddingTop: { xs: 2, sm: 3 },
              paddingX: { xs: 2, sm: 3 },
              paddingBottom: { xs: 1, sm: 2 },
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              color="primary"
              sx={{
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Feedback Hub
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
                marginBottom: 1,
              }}
            >
              Hệ thống quản lý phản hồi người dùng
            </Typography>
          </Box>

          {/* ==================== TABS NAVIGATION ==================== */}
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
                  "&:hover": {
                    backgroundColor: "action.hover",
                    transition: "background-color 0.2s ease",
                  },
                  "&.Mui-selected": {
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "& .MuiTabs-flexContainer": {
                  height: { xs: 56, sm: 64 },
                },
              }}
            >
              <Tab
                icon={<Login sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />}
                label="Đăng Nhập"
                id="auth-tab-0"
                aria-controls="auth-tabpanel-0"
                iconPosition={isMobile ? "top" : "start"}
                sx={{
                  "& .MuiTab-iconWrapper": {
                    marginBottom: isMobile ? 0.5 : 0,
                    marginRight: isMobile ? 0 : 1,
                  },
                }}
              />
              <Tab
                icon={<PersonAdd sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />}
                label="Đăng Ký"
                id="auth-tab-1"
                aria-controls="auth-tabpanel-1"
                iconPosition={isMobile ? "top" : "start"}
                sx={{
                  "& .MuiTab-iconWrapper": {
                    marginBottom: isMobile ? 0.5 : 0,
                    marginRight: isMobile ? 0 : 1,
                  },
                }}
              />
            </Tabs>
          </Box>

          {/* ==================== TAB CONTENT ==================== */}
          <CardContent
            sx={{
              padding: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              "&:last-child": {
                paddingBottom: { xs: 2, sm: 3, md: 4 },
              },
              minHeight: { xs: 400, sm: 450, md: 500 },
              position: "relative",
            }}
          >
            <TabPanel value={currentTab} index={0}>
              <LoginForm
                onLogin={onLogin}
                loading={loginLoading}
                error={loginError}
                onSwitchToRegister={switchToRegister}
              />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <RegisterForm
                onRegister={onRegister}
                loading={registerLoading}
                error={registerError}
                onSwitchToLogin={switchToLogin}
              />
            </TabPanel>
          </CardContent>

          {/* ==================== FOOTER ==================== */}
          <Box
            sx={{
              textAlign: "center",
              paddingBottom: { xs: 1.5, sm: 2 },
              paddingX: { xs: 2, sm: 3 },
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                opacity: 0.8,
              }}
            >
              © 2024 Feedback Hub. Tất cả quyền được bảo lưu.
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default AuthTabs;
