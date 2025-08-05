import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { theme } from "@/theme";
import AuthTabs from "./components/auth/AuthTabs";

function App() {
  // ==================== STATE ====================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // ==================== HANDLERS ====================
  const handleLogin = async (formData) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (formData.email === "admin@example.com" && formData.password === "123456") {
        const userData = {
          id: 1,
          email: formData.email,
          name: "Admin User",
          role: "admin",
        };

        setUser(userData);
        setIsLoggedIn(true);
      } else {
        throw new Error("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setRegisterLoading(true);
    setRegisterError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        id: Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: "user",
      };

      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      setRegisterError(error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLoginError(null);
    setRegisterError(null);
  };

  // ==================== RENDER ====================
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!isLoggedIn ? (
        // ==================== AUTH VIEW ====================
        <AuthTabs
          onLogin={handleLogin}
          onRegister={handleRegister}
          loginLoading={loginLoading}
          registerLoading={registerLoading}
          loginError={loginError}
          registerError={registerError}
        />
      ) : (
        // ==================== MAIN APP VIEW ====================
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ==================== HEADER ==================== */}
          <Box
            component="header"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              py: 2,
              boxShadow: 1,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                  Feedback Hub
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body2">
                    Xin chào, <strong>{user.name}</strong>
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    sx={{
                      color: "primary.contrastText",
                      borderColor: "primary.contrastText",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        borderColor: "primary.contrastText",
                      },
                    }}
                  >
                    Đăng Xuất
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* ==================== MAIN CONTENT ==================== */}
          <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="h3" component="h2" gutterBottom sx={{ color: "primary.main" }}>
                Chào mừng trở lại
              </Typography>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                {user.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Email: <strong>{user.email}</strong>
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Bạn đã đăng nhập thành công vào Feedback Hub
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="contained" size="large" sx={{ minWidth: 200 }}>
                  Gửi Phản Hồi
                </Button>

                <Button variant="outlined" size="large" sx={{ minWidth: 200 }}>
                  Xem Phản Hồi
                </Button>

                {user.role === "admin" && (
                  <Button variant="outlined" color="secondary" size="large" sx={{ minWidth: 200 }}>
                    Quản Trị
                  </Button>
                )}
              </Box>

              <Box sx={{ mt: 4, p: 2, backgroundColor: "grey.50", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Thông tin tài khoản:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {user.id} | Role: {user.role}
                </Typography>
              </Box>
            </Paper>
          </Container>

          {/* ==================== FOOTER ==================== */}
          <Box
            component="footer"
            sx={{
              py: 2,
              px: 2,
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © 2024 Feedback Hub. Tất cả quyền được bảo lưu.
              </Typography>
            </Container>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
