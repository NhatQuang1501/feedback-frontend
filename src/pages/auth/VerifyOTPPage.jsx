import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";
import { verifyOtp, sendOtp, clearAuthError } from "@/store/slices/authSlice";

const VerifyOTPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const email = location.state?.email;
  const message = location.state?.message;

  // ==================== EFFECTS ====================
  useEffect(() => {
    document.title = "Xác thực OTP - Feedback Hub";

    // Redirect if no email
    if (!email) {
      navigate("/auth/login");
      return;
    }

    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [email, isAuthenticated, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto clear error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearAuthError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // ==================== HANDLERS ====================
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return;
    }

    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await dispatch(sendOtp({ email })).unwrap();
      setCountdown(60); // 60 seconds countdown
    } catch (error) {
      console.error("Resend OTP failed:", error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  // ==================== RENDER ====================
  if (!email) {
    return null;
  }

  return (
    <Container maxWidth="sm" className="py-8">
      <Box className="from-primary-light via-background-default to-secondary-light/10 flex min-h-screen items-center justify-center bg-gradient-to-br">
        <Paper
          elevation={6}
          className="w-full overflow-hidden rounded-2xl border border-[#fff1b8]/30 bg-gradient-to-br from-white to-[#fffef7] p-8 shadow-lg transition-all duration-300 ease-in-out"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <Typography variant="h4" component="h1" className="mb-2 font-bold text-gray-900">
              Xác thực Email
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {message || "Vui lòng nhập mã OTP đã được gửi đến email của bạn"}
            </Typography>
          </div>

          {/* Email Display */}
          <Box className="mb-6 flex items-center justify-center rounded-lg bg-gray-50 p-4">
            <Email className="mr-2 text-gray-500" />
            <Typography variant="body1" className="font-medium text-gray-700">
              {email}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" className="mb-6" onClose={() => dispatch(clearAuthError())}>
              {typeof error === "string" ? error : "Xác thực thất bại. Vui lòng thử lại."}
            </Alert>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <Typography variant="subtitle2" className="mb-2 font-medium text-gray-700">
                Mã OTP (6 số)
              </Typography>
              <TextField
                fullWidth
                value={otp}
                onChange={handleOtpChange}
                placeholder="Nhập mã OTP"
                variant="outlined"
                inputProps={{
                  maxLength: 6,
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
                className="[&_.MuiOutlinedInput-input]:text-center [&_.MuiOutlinedInput-input]:font-mono [&_.MuiOutlinedInput-input]:text-lg"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={otp.length !== 6 || isLoading}
              className="bg-primary text-secondary hover:bg-primary-dark"
            >
              {isLoading ? <CircularProgress size={24} className="text-white" /> : "Xác thực"}
            </Button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <Typography variant="body2" className="text-gray-600">
              Không nhận được mã?{" "}
              {countdown > 0 ? (
                <span className="font-medium text-gray-500">Gửi lại sau {countdown}s</span>
              ) : (
                <Button
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="border-none bg-transparent p-0 font-medium text-[#e6d486] transition-colors duration-200 hover:text-[#ffec99] hover:underline"
                >
                  {resendLoading ? "Đang gửi..." : "Gửi lại"}
                </Button>
              )}
            </Typography>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleBackToLogin}
              startIcon={<ArrowBack />}
              className="text-gray-600 hover:text-gray-800"
            >
              Quay lại đăng nhập
            </Button>
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyOTPPage;
