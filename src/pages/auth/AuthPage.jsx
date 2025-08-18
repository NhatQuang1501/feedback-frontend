import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, googleLogin, clearAuthError } from "@/store/slices/authSlice";
import AuthTabs from "../../components/auth/AuthTabs";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  // ==================== EFFECTS ====================
  useEffect(() => {
    document.title = "Đăng Nhập / Đăng Ký - Feedback Hub";
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // ==================== HANDLERS ====================
  const handleLogin = async (formData) => {
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      console.log("Login successful:", result);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (formData) => {
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      console.log("Registration successful:", result);
      // Chuyển sang màn hình OTP verification
      navigate("/auth/verify-otp", {
        state: {
          email: formData.email,
          message: "Vui lòng kiểm tra email để xác thực tài khoản",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleLogin = async (token, tokenType = "id_token") => {
    try {
      const result = await dispatch(googleLogin(token)).unwrap();
      console.log("Google login successful:", result);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleClearError = () => {
    dispatch(clearAuthError());
  };

  // ==================== RENDER ====================
  return (
    <div>
      <AuthTabs
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={handleGoogleLogin}
        loginLoading={isLoading}
        registerLoading={isLoading}
        loginError={error}
        registerError={error}
        onClearError={handleClearError}
      />
    </div>
  );
};

export default AuthPage;
