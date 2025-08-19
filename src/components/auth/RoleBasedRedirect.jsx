import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, isAdmin, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (initialized && isAuthenticated && user) {
      const currentPath = location.pathname;

      // If user is on auth pages, redirect based on role
      if (currentPath.startsWith("/auth")) {
        if (isAdmin) {
          navigate("/admin/feedbacks", { replace: true });
        } else {
          navigate("/feedbacks/create", { replace: true });
        }
        return;
      }

      // Prevent regular users from accessing admin routes
      if (!isAdmin && currentPath.startsWith("/admin")) {
        navigate("/feedbacks/create", { replace: true });
        return;
      }

      // Prevent admin from accessing user routes (except auth routes)
      if (isAdmin && !currentPath.startsWith("/admin") && !currentPath.startsWith("/auth")) {
        navigate("/admin/feedbacks", { replace: true });
        return;
      }
    }
  }, [initialized, isAuthenticated, user, isAdmin, location.pathname, navigate]);

  return <>{children}</>;
};

export default RoleBasedRedirect;
