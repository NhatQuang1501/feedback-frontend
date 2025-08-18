import React, { useState, useEffect } from "react";
import { Typography, Alert, Link, Divider, Box } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

// Custom components
import FormField from "../common/FormField";
import SubmitButton from "../common/SubmitButton";
import SocialButton from "../common/SocialButton";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

// Hooks and utils
import { useForm } from "../../hooks/useForm";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";
import { validateLoginForm } from "../../utils/validation";

// ==================== LOGIN FORM COMPONENT ====================
const LoginForm = ({
  onLogin,
  onGoogleLogin,
  loading = false,
  error = null,
  onSwitchToRegister,
}) => {
  // ==================== HOOKS ====================
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { showPassword, togglePassword } = usePasswordToggle();

  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    validateLoginForm,
  );

  // ==================== EFFECTS ====================
  useEffect(() => {
    // Initialize Google Sign-In when component mounts
    if (typeof window.google !== "undefined") {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (clientId && clientId !== "your-google-client-id-here") {
        console.log("Initializing Google OAuth2...");

        // Use ID token flow for better security
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            console.log("Google ID token callback received:", response);

            if (response.credential) {
              try {
                console.log("Sending ID token to backend...");
                await onGoogleLogin(response.credential);
              } catch (error) {
                console.error("Error processing Google login:", error);
                alert("Lỗi khi xử lý đăng nhập Google.");
              }
            } else {
              console.error("No ID token received from Google");
              alert("Không nhận được ID token từ Google.");
            }
          },
          error_callback: (error) => {
            console.error("Google ID token error:", error);
            alert(`Lỗi Google OAuth: ${error.error || "Unknown error"}`);
          },
        });

        console.log("Google ID token flow initialized successfully");
      }
    }
  }, [onGoogleLogin]);

  // ==================== HANDLERS ====================
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await handleSubmit(onLogin);
    if (success) {
      console.log("Login successful");
    }
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleForgotPasswordSuccess = (email) => {
    console.log("Email reset đã được gửi đến:", email);
  };

  // ==================== RENDER ====================
  return (
    <div className="w-full">
      {/* ==================== ERROR ALERT ==================== */}
      {error && (
        <Alert severity="error" className="mb-6 rounded-lg">
          {error}
        </Alert>
      )}

      {/* ==================== LOGIN FORM ==================== */}
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="space-y-6">
          {/* ==================== EMAIL FIELD ==================== */}
          <div className="space-y-1">
            <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
              Địa chỉ email
            </Typography>
            <FormField
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              startIcon={<Email className="text-xl text-gray-500" />}
              className="w-full"
            />
          </div>

          {/* ==================== PASSWORD FIELD ==================== */}
          <div className="space-y-1">
            <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
              Mật khẩu
            </Typography>
            <FormField
              name="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              startIcon={<Lock className="text-xl text-gray-500" />}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              className="w-full"
            />
          </div>

          {/* ==================== FORGOT PASSWORD ==================== */}
          <div className="flex justify-end">
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={handleForgotPasswordOpen}
              className="cursor-pointer border-none bg-transparent text-sm font-medium text-[#e6d486] transition-colors duration-200 hover:text-[#ffec99] hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* ==================== SUBMIT BUTTON ==================== */}
          <div className="pt-2">
            <SubmitButton loading={loading || isSubmitting} className="w-full">
              Đăng Nhập
            </SubmitButton>
          </div>

          {/* ==================== DIVIDER ==================== */}
          <div className="py-2">
            <Divider className="relative">
              <Typography
                variant="body2"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-4 text-gray-500"
              >
                Hoặc
              </Typography>
            </Divider>
          </div>

          {/* ==================== GOOGLE BUTTON ==================== */}
          <SocialButton
            icon={<GoogleIcon className="text-xl" />}
            onClick={() => {
              if (window.google && window.google.accounts && window.google.accounts.id) {
                console.log("Requesting Google ID token...");
                window.google.accounts.id.prompt();
              } else {
                alert("Google OAuth chưa được khởi tạo. Vui lòng thử lại sau vài giây.");
              }
            }}
            className="w-full"
          >
            Đăng nhập với Google
          </SocialButton>
        </div>
      </form>

      {/* ==================== FORGOT PASSWORD DIALOG ==================== */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        onSuccess={handleForgotPasswordSuccess}
      />
    </div>
  );
};

export default LoginForm;
