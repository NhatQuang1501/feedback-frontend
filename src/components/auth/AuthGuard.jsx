import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, setInitialized } from "@/store/slices/authSlice";

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated && !initialized) {
        try {
          await dispatch(fetchProfile()).unwrap();
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          // Clear invalid tokens
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      dispatch(setInitialized());
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, initialized]);

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
