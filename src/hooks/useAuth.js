import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  logoutUser,
  clearAuthError,
  fetchProfile,
  refreshToken,
  googleLogin,
  clearAuth,
} from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const login = (formData) => dispatch(loginUser(formData));
  const register = (formData) => dispatch(registerUser(formData));
  const logout = () => dispatch(logoutUser());
  const clearError = () => dispatch(clearAuthError());
  const getProfile = () => dispatch(fetchProfile());
  const refresh = () => dispatch(refreshToken());
  const clearAuthState = () => dispatch(clearAuth());

  const googleAuth = (idToken) => dispatch(googleLogin(idToken));

  const isAdmin = () => auth.user?.role?.name === "admin";
  const isUser = () => auth.user?.role?.name === "user";
  const hasRole = (role) => auth.user?.role?.name === role;
  const hasAnyRole = (roles) => roles.includes(auth.user?.role?.name);

  const goToLogin = () => navigate("/auth/login");
  const goToRegister = () => navigate("/auth/register");
  const goToVerifyOTP = (email, message) => {
    navigate("/auth/verify-otp", {
      state: { email, message },
    });
  };
  const goToDashboard = () => {
    if (isAdmin()) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };
  const goToHome = () => navigate("/");

  const canAccess = (requiredRoles = []) => {
    if (!auth.isAuthenticated) return false;
    if (requiredRoles.length === 0) return true;
    return hasAnyRole(requiredRoles);
  };

  const isGoogleOAuthAvailable = () => {
    return window.google && window.google.accounts;
  };

  const getGoogleUserInfo = (idToken) => {
    try {
      const base64Url = idToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode Google ID token:", error);
      return null;
    }
  };

  const handleGoogleOAuthSuccess = async (idToken, onSuccess, onError) => {
    try {
      const googleUserInfo = getGoogleUserInfo(idToken);

      if (!googleUserInfo) {
        onError?.("Không thể lấy thông tin từ Google");
        return;
      }

      console.log("Google user info:", googleUserInfo);

      const result = await googleAuth(idToken);

      if (result.meta.requestStatus === "fulfilled") {
        onSuccess?.(result.payload, googleUserInfo);
      } else {
        onError?.(result.payload || "Đăng nhập Google thất bại");
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
      onError?.(error.message || "Đăng nhập Google thất bại");
    }
  };

  return {
    // State
    ...auth,

    // Actions
    login,
    register,
    logout,
    clearError,
    getProfile,
    refresh,
    googleAuth,
    clearAuthState,

    // Helpers
    isAdmin,
    isUser,
    hasRole,
    hasAnyRole,
    canAccess,

    // Navigation
    goToLogin,
    goToRegister,
    goToVerifyOTP,
    goToDashboard,
    goToHome,

    // Google OAuth
    isGoogleOAuthAvailable,
    getGoogleUserInfo,
    handleGoogleOAuthSuccess,
  };
};
