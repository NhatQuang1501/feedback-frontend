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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Home, CheckCircle } from "@mui/icons-material";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  // ==================== STATE ====================
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoading, error, isAuthenticated, user, registrationStep } = useSelector(
    (state) => state.auth,
  );

  const [pageError, setPageError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const REGISTRATION_STEPS = ["Thông tin cá nhân", "Xác thực email", "Hoàn thành"];

  const from = location.state?.from?.pathname || "/dashboard";
  const urlParams = new URLSearchParams(location.search);
  const messageFromUrl = urlParams.get("message");
  const emailToken = urlParams.get("token");

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (emailToken) {
      handleEmailVerification(emailToken);
    }
  }, [emailToken]);

  useEffect(() => {
    if (messageFromUrl) {
      switch (messageFromUrl) {
        case "email-verified":
          setCurrentStep(2);
          setShowSuccessMessage(true);
          break;
        case "email-verification-failed":
          setPageError("Xác thực email thất bại. Vui lòng thử lại.");
          break;
        default:
          break;
      }
    }
  }, [messageFromUrl]);

  useEffect(() => {
    document.title = "Đăng Ký - Feedback Hub";
    return () => {
      document.title = "Feedback Hub";
    };
  }, []);

  useEffect(() => {
    if (registrationStep !== undefined) {
      setCurrentStep(registrationStep);
    }
  }, [registrationStep]);

  // ==================== HANDLERS ====================
  const handleRegister = async (formData) => {
    try {
      setPageError(null);
      setRegistrationData(formData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentStep(1);
      setEmailSent(true);
    } catch (error) {
      setPageError(error.message || "Có lỗi xảy ra khi đăng ký");
    }
  };

  const handleEmailVerification = async (token) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCurrentStep(2);
      setShowSuccessMessage(true);

      setTimeout(() => {
        navigate("/login", {
          state: { message: "Đăng ký thành công! Vui lòng đăng nhập." },
        });
      }, 3000);
    } catch (error) {
      setPageError("Xác thực email thất bại. Vui lòng thử lại.");
    }
  };

  const handleResendEmail = async () => {
    try {
      if (!registrationData?.email) {
        setPageError("Không tìm thấy email để gửi lại");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Đã gửi lại email xác thực!");
    } catch (error) {
      setPageError("Không thể gửi lại email. Vui lòng thử lại sau.");
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login", {
      state: { from: location.state?.from },
    });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleCloseSuccess = () => {
    setShowSuccessMessage(false);
  };

  // ==================== RENDER FUNCTIONS ====================
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <RegisterForm
            onRegister={handleRegister}
            loading={isLoading}
            error={error}
            onSwitchToLogin={handleNavigateToLogin}
          />
        );

      case 1:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircle
              sx={{
                fontSize: 64,
                color: "primary.main",
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom>
              Kiểm tra email của bạn
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Chúng tôi đã gửi link xác thực đến email: <strong>{registrationData?.email}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Vui lòng click vào link trong email để hoàn tất đăng ký.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleResendEmail}
                sx={{ textDecoration: "none" }}
              >
                Gửi lại email
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={handleNavigateToLogin}
                sx={{ textDecoration: "none" }}
              >
                Quay lại đăng nhập
              </Link>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircle
              sx={{
                fontSize: 64,
                color: "success.main",
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom color="success.main">
              Đăng ký thành công
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Tài khoản của bạn đã được tạo và xác thực thành công.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn sẽ được chuyển đến trang đăng nhập trong giây lát...
            </Typography>
          </Box>
        );

      default:
        return null;
    }
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
          <Typography color="text.primary">Đăng ký</Typography>
        </Breadcrumbs>
      </Container>

      {/* ==================== MAIN CONTENT ==================== */}
      <Container
        maxWidth="md"
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
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Tạo tài khoản mới
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tham gia Feedback Hub để chia sẻ ý kiến của bạn
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={currentStep} alternativeLabel>
                {REGISTRATION_STEPS.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}

          {isMobile && (
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Bước {currentStep + 1} / {REGISTRATION_STEPS.length}:{" "}
                {REGISTRATION_STEPS[currentStep]}
              </Typography>
            </Box>
          )}

          {showSuccessMessage && currentStep === 2 && (
            <Alert severity="success" onClose={handleCloseSuccess} sx={{ mb: 3 }}>
              Chúc mừng! Tài khoản của bạn đã được tạo thành công.
            </Alert>
          )}

          {pageError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {pageError}
            </Alert>
          )}

          {renderStepContent()}

          {currentStep === 0 && (
            <>
              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Đã có tài khoản?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleNavigateToLogin}
                    sx={{
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Đăng nhập ngay
                  </Link>
                </Typography>
              </Box>
            </>
          )}
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

export default RegisterPage;
