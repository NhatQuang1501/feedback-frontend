import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, googleLogin, clearAuthError } from "@/store/slices/authSlice";
import AuthTabs from "../../components/auth/AuthTabs";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated, user, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Đăng Nhập / Đăng Ký - Feedback Hub";
  }, []);

  // Tự động chuyển hướng sau khi đăng nhập
  useEffect(() => {
    if (isAuthenticated && user) {
      if (isAdmin) {
        navigate("/admin/feedbacks", { replace: true });
      } else {
        navigate("/feedbacks/create", { replace: true });
      }
    }
  }, [isAuthenticated, user, isAdmin, navigate]);

  const handleLogin = async (formData) => {
    try {
      await dispatch(loginUser(formData)).unwrap();
    } catch (error) {
    }
  };

  const handleRegister = async (formData) => {
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/auth/verify-otp", {
        state: {
          email: formData.email,
          message: "Vui lòng kiểm tra email để xác thực tài khoản",
        },
      });
    } catch (error) {}
  };

  const handleGoogleLogin = async (token, tokenType = "id_token") => {
    try {
      await dispatch(googleLogin(token)).unwrap();
    } catch (error) {}
  };

  const handleClearError = () => {
    dispatch(clearAuthError());
  };

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
