import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, CircularProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "@/theme/index";
// Layouts
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import AdminLayout from "@/components/layout/AdminLayout";
// Route Guards
import ProtectedRoute from "@/routes/guards/ProtectedRoute";
import { ToastProvider } from "@/components/common/Toast";

const FeedbackCreatePage = lazy(() => import("@/pages/feedback/user/FeedbackCreatePage"));
const NotFoundPage = lazy(() => import("@/pages/static/NotFoundPage"));
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const VerifyOTPPage = lazy(() => import("@/pages/auth/VerifyOTPPage"));
const AdminFeedbackManagementPage = lazy(
  () => import("@/pages/feedback/admin/AdminFeedbackManagementPage"),
);
const FeedbackDetailPage = lazy(() => import("@/pages/feedback/FeedbackDetailPage"));
const AdminDashboardPage = lazy(() => import("@/pages/dashboard/AdminDashboardPage"));
const UserFeedbackPage = lazy(() => import("@/pages/feedback/user/UserFeedbackPage"));

function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          <Router>
            <Suspense
              fallback={
                <CircularProgress className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              }
            >
              <Routes>
                {/* Auth Routes - Public */}
                <Route path="/auth" element={<AuthLayout />}>
                  <Route index element={<Navigate to="/auth/login" replace />} />
                  <Route path="login" element={<AuthPage />} />
                  <Route path="verify-otp" element={<VerifyOTPPage />} />
                  <Route path="forgot-password" element={<div>Forgot Password Page</div>} />
                  <Route path="reset-password" element={<div>Reset Password Page</div>} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/feedbacks" replace />} />
                    <Route path="feedbacks" element={<AdminFeedbackManagementPage />} />
                    <Route path="feedbacks/:id" element={<FeedbackDetailPage />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                  </Route>

                  {/* User Routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/feedbacks/create" replace />} />
                    <Route path="feedbacks/create" element={<FeedbackCreatePage />} />
                    <Route path="feedbacks/:id" element={<FeedbackDetailPage />} />
                    <Route path="feedbacks" element={<UserFeedbackPage />} />
                  </Route>
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
