import React, { useState, useEffect, useRef } from "react";
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

const LoginForm = ({
  onLogin,
  onGoogleLogin,
  loading = false,
  error = null,
  onSwitchToRegister,
}) => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { showPassword, togglePassword } = usePasswordToggle();

  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    validateLoginForm,
  );

  const initRef = useRef(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    // Guard against double init in React StrictMode
    const init = () => {
      if (initRef.current) return;
      initRef.current = true;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (clientId && typeof window !== "undefined" && window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            ux_mode: "popup",
            auto_select: false,
            cancel_on_tap_outside: false,
            use_fedcm_for_prompt: true,
            callback: async (response) => {
              if (response?.credential) {
                try {
                  await onGoogleLogin(response.credential);
                } catch (error) {
                  alert("Lỗi khi xử lý đăng nhập Google.");
                }
              } else {
                alert("Không nhận được ID token từ Google.");
              }
            },
            error_callback: (error) => {
              alert(`Lỗi Google OAuth: ${error.error || "Unknown error"}`);
            },
          });
          if (googleBtnRef.current) {
            try {
              window.google.accounts.id.renderButton(googleBtnRef.current, {
                theme: "outline",
                size: "large",
                text: "continue_with",
                shape: "pill",
                logo_alignment: "left",
              });
            } catch (e) {}
          }
        } catch (e) {}
      }
    };

    // Defer init until google script is available
    if (typeof window !== "undefined") {
      if (window.google?.accounts?.id) {
        init();
      } else {
        const interval = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(interval);
            init();
          }
        }, 200);
        setTimeout(() => clearInterval(interval), 5000);
      }
    }
  }, [onGoogleLogin]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await handleSubmit(onLogin);
    if (success) {
    }
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleForgotPasswordSuccess = (email) => {};

  return (
    <div className="w-full">
      {error && (
        <Alert severity="error" className="mb-6 rounded-lg">
          {error}
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="space-y-6">
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

          <div className="pt-2">
            <SubmitButton loading={loading || isSubmitting} className="w-full">
              Đăng Nhập
            </SubmitButton>
          </div>

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

          <div ref={googleBtnRef} className="flex w-full justify-center" />
        </div>
      </form>
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        onSuccess={handleForgotPasswordSuccess}
      />
    </div>
  );
};

export default LoginForm;
