import React, { useEffect, useRef } from "react";
import { Typography, Alert, Divider, Grid } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

// Custom components
import FormField from "../common/FormField";
import SubmitButton from "../common/SubmitButton";
import SocialButton from "../common/SocialButton";

// Hooks and utils
import { useForm } from "../../hooks/useForm";
import { useMultiplePasswordToggle } from "../../hooks/usePasswordToggle";
import { validateRegisterForm } from "../../utils/validation";

const RegisterForm = ({
  onRegister,
  onGoogleLogin,
  loading = false,
  error = null,
  onSwitchToLogin,
}) => {
  const { passwordVisibility, togglePassword, getVisibility } = useMultiplePasswordToggle([
    "password",
    "confirmPassword",
  ]);

  const googleBtnRef = useRef(null);

  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegisterForm,
  );

  useEffect(() => {
    let initialized = false;
    const init = () => {
      if (initialized) return;
      initialized = true;
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
                  alert("Lỗi khi xử lý đăng ký Google.");
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
            } catch (e) {
              
            }
          }
        } catch (e) {
          
        }
      }
    };

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

  const formatError = (error) => {
    if (!error) return null;

    // Nếu error là object (từ API response)
    if (typeof error === "object") {
      // Trường hợp error có cấu trúc: { field: ["error message"] }
      if (error.password2 || error.full_name || error.email || error.password) {
        const errorMessages = [];

        Object.entries(error).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => errorMessages.push(msg));
          } else if (typeof messages === "string") {
            errorMessages.push(messages);
          }
        });

        return errorMessages.join(". ");
      }

      // Trường hợp error có message
      if (error.message) {
        return error.message;
      }

      // Trường hợp error có detail
      if (error.detail) {
        return error.detail;
      }

      // Fallback: convert object to string
      return JSON.stringify(error);
    }

    // Nếu error đã là string
    return error;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await handleSubmit((data) => {
      // *** FIX: Map frontend field names to API field names ***
      const registerData = {
        full_name: data.fullName, // fullName -> full_name
        email: data.email,
        password: data.password,
        password2: data.confirmPassword, // confirmPassword -> password2
      };

      return onRegister(registerData);
    });

    if (success) {
    }
  };

  const handleGoogleRegister = async () => {
    try {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt();
      } else {
        alert("Google OAuth chưa được khởi tạo. Vui lòng thử lại sau vài giây.");
      }
    } catch (error) {
      alert(`Lỗi đăng ký Google: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <Alert severity="error" className="mb-6 rounded-lg">
          {formatError(error)}
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="space-y-6">
          <div className="space-y-1">
            <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
              Họ và tên
            </Typography>
            <FormField
              name="fullName"
              placeholder="Nhập họ và tên của bạn"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              startIcon={<Person className="text-xl text-gray-500" />}
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
              Địa chỉ email
            </Typography>
            <FormField
              name="email"
              type="email"
              placeholder="yourname@example.com"
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
              showPassword={getVisibility("password")}
              onTogglePassword={() => togglePassword("password")}
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
              Xác nhận mật khẩu
            </Typography>
            <FormField
              name="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              startIcon={<Lock className="text-xl text-gray-500" />}
              showPassword={getVisibility("confirmPassword")}
              onTogglePassword={() => togglePassword("confirmPassword")}
              className="w-full"
            />
          </div>

          <div className="pt-4">
            <SubmitButton loading={loading || isSubmitting} className="w-full">
              Đăng Ký
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

          <div ref={googleBtnRef} className="w-full flex justify-center" />

          <div className="pt-4">
            <Typography
              variant="body2"
              className="text-center text-sm leading-relaxed text-gray-600 opacity-80"
            >
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <span className="cursor-pointer font-medium text-[#e6d486] underline transition-all duration-200 hover:text-[#ffec99] hover:no-underline">
                Điều khoản sử dụng
              </span>{" "}
              và{" "}
              <span className="cursor-pointer font-medium text-[#e6d486] underline transition-all duration-200 hover:text-[#ffec99] hover:no-underline">
                Chính sách bảo mật
              </span>{" "}
              của chúng tôi.
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
