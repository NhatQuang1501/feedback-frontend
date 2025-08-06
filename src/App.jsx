import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, CircularProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "@/theme/index";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Lazy load components
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const FeedbackPage = lazy(() => import("@/pages/feedback/FeedbackPage"));
const NotFoundPage = lazy(() => import("@/pages/static/NotFoundPage"));

function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense
            fallback={
              <CircularProgress className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            }
          >
            <Routes>
              {/* Auth Routes - No Header/Footer */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="forgot-password" element={<div>Forgot Password Page</div>} />
                <Route path="reset-password" element={<div>Reset Password Page</div>} />
                <Route path="verify-otp" element={<div>Verify OTP Page</div>} />
              </Route>

              {/* Main Routes - With Header/Footer */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/feedback" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
              </Route>

              {/* 404 Page - No Layout */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
