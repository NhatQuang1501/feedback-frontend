import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, setInitialized, clearAuth } from "@/store/slices/authSlice";

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken && !initialized) {
        try {
          // Fetch profile để verify token và lấy user info
          await dispatch(fetchProfile()).unwrap();
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          // Clear invalid tokens
          dispatch(clearAuth());
        }
      } else if (!accessToken && !refreshToken) {
        // No tokens, clear auth state
        dispatch(clearAuth());
      }
      
      dispatch(setInitialized());
    };

    initializeAuth();
  }, [dispatch, initialized]);

  // Show loading while initializing
  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;