import React from "react";
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
const RegisterForm = ({ onRegister, loading = false, error = null, onSwitchToLogin }) => {
  // ==================== HOOKS ====================
  const { passwordVisibility, togglePassword, getVisibility } = useMultiplePasswordToggle([
    "password",
    "confirmPassword",
  ]);

  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegisterForm,
  );

  // ==================== HANDLERS ====================
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await handleSubmit((data) => {
      const { confirmPassword, ...registerData } = data;
      return onRegister(registerData);
    });

    if (success) {
      console.log("Registration successful");
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
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

      {/* ==================== REGISTER FORM ==================== */}
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="space-y-6">
          {/* ==================== NAME FIELDS ==================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-1">
              <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                Họ
              </Typography>
              <FormField
                name="firstName"
                placeholder="Nhập họ của bạn"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                startIcon={<Person className="text-xl text-gray-500" />}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                Tên
              </Typography>
              <FormField
                name="lastName"
                placeholder="Nhập tên của bạn"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                className="w-full"
              />
            </div>
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
