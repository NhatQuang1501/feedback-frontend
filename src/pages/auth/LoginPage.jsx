import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Paper,
  Typography,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  // ==================== STATE ====================
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [pageError, setPageError] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";
  const urlParams = new URLSearchParams(location.search);
  const messageFromUrl = urlParams.get("message");

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (messageFromUrl) {
      switch (messageFromUrl) {
        case "session-expired":
          setRedirectMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          break;
        case "unauthorized":
          setRedirectMessage("Bạn cần đăng nhập để truy cập trang này.");
          break;
        case "welcome":
          setShowWelcomeMessage(true);
          break;
        default:
          break;
      }
    }
  }, [messageFromUrl]);

  useEffect(() => {
    document.title = "Đăng Nhập - Feedback Hub";
    return () => {
      document.title = "Feedback Hub";
    };
  }, []);

  // ==================== HANDLERS ====================
  const handleLogin = async (formData) => {
    try {
      setPageError(null);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (formData.email === "admin@example.com" && formData.password === "123456") {
        console.log("Đăng nhập thành công!");
      } else {
        throw new Error("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      setPageError(error.message || "Có lỗi xảy ra khi đăng nhập");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register", {
      state: { from: location.state?.from },
    });
  };

  const handleCloseWelcome = () => {
    setShowWelcomeMessage(false);
  };

  const handleCloseRedirect = () => {
    setRedirectMessage("");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // ==================== RENDER ====================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ==================== HEADER ==================== */}
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            color="inherit"
            component="button"
            onClick={handleGoHome}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Trang chủ
          </Link>
          <Typography color="text.primary">Đăng nhập</Typography>
        </Breadcrumbs>
      </Container>

      {/* ==================== MAIN CONTENT ==================== */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={isMobile ? 1 : 3}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Chào mừng trở lại
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Đăng nhập để ti��p tục sử dụng Feedback Hub
            </Typography>
          </Box>

          {showWelcomeMessage && (
            <Alert severity="info" onClose={handleCloseWelcome} sx={{ mb: 3 }}>
              Chào mừng bạn đến với Feedback Hub! Vui lòng đăng nhập để bắt đầu.
            </Alert>
          )}

          {redirectMessage && (
            <Alert severity="warning" onClose={handleCloseRedirect} sx={{ mb: 3 }}>
              {redirectMessage}
            </Alert>
          )}

          {pageError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {pageError}
            </Alert>
          )}

          <LoginForm
            onLogin={handleLogin}
            loading={isLoading}
            error={error}
            onSwitchToRegister={handleNavigateToRegister}
          />

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Chưa có tài khoản?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={handleNavigateToRegister}
                sx={{
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Đăng ký ngay
              </Link>
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
  );
};

export default LoginPage;
