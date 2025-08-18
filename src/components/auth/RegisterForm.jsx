import React, { useEffect } from "react";
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

// ==================== REGISTER FORM COMPONENT ====================
const RegisterForm = ({
  onRegister,
  onGoogleLogin,
  loading = false,
  error = null,
  onSwitchToLogin,
}) => {
  // ==================== HOOKS ====================
  const { passwordVisibility, togglePassword, getVisibility } = useMultiplePasswordToggle([
    "password",
    "confirmPassword",
  ]);

  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegisterForm,
  );

  // ==================== ERROR FORMATTING ====================
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

  // ==================== HANDLERS ====================
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

      console.log("Sending register data:", registerData); // Debug log
      return onRegister(registerData);
    });

    if (success) {
      console.log("Registration successful");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      console.log("Starting Google OAuth for registration...");

      if (window.google && window.google.accounts && window.google.accounts.id) {
        console.log("Requesting Google ID token for registration...");
        window.google.accounts.id.prompt();
      } else {
        alert("Google OAuth chưa được khởi tạo. Vui lòng thử lại sau vài giây.");
      }
    } catch (error) {
      console.error("Google register error:", error);
      alert(`Lỗi đăng ký Google: ${error.message}`);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="w-full">
      {/* ==================== ERROR ALERT ==================== */}
      {error && (
        <Alert severity="error" className="mb-6 rounded-lg">
          {formatError(error)}
        </Alert>
      )}

      {/* ==================== REGISTER FORM ==================== */}
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="space-y-6">
          {/* ==================== FULL NAME FIELD ==================== */}
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

          {/* ==================== EMAIL FIELD ==================== */}
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
              showPassword={getVisibility("password")}
              onTogglePassword={() => togglePassword("password")}
              className="w-full"
            />
          </div>

          {/* ==================== CONFIRM PASSWORD FIELD ==================== */}
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

          {/* ==================== SUBMIT BUTTON ==================== */}
          <div className="pt-4">
            <SubmitButton loading={loading || isSubmitting} className="w-full">
              Đăng Ký
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
            onClick={handleGoogleRegister}
            className="w-full"
          >
            Đăng ký với Google
          </SocialButton>

          {/* ==================== TERMS ==================== */}
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
