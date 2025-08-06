import React from "react";
import {
  Box,
  Typography,
  Alert,
  Divider,
  Stack,
  Grid,
} from "@mui/material";
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
    'password',
    'confirmPassword'
  ]);
  
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegisterForm
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
    <Box>
      {/* ==================== ERROR ALERT ==================== */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* ==================== REGISTER FORM ==================== */}
      <Box component="form" onSubmit={handleFormSubmit}>
        <Stack spacing={2.5}>
          {/* ==================== NAME FIELDS ==================== */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormField
                name="firstName"
                label="Họ"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="Nhập họ của bạn"
                startIcon={<Person color="action" sx={{ fontSize: '1.2rem' }} />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                name="lastName"
                label="Tên"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Nhập tên của bạn"
              />
            </Grid>
          </Grid>

          {/* ==================== EMAIL FIELD ==================== */}
          <FormField
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Nhập email của bạn"
            startIcon={<Email color="action" sx={{ fontSize: '1.2rem' }} />}
          />

          {/* ==================== PASSWORD FIELD ==================== */}
          <FormField
            name="password"
            type="password"
            label="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Nhập mật khẩu của bạn"
            startIcon={<Lock color="action" sx={{ fontSize: '1.2rem' }} />}
            showPassword={getVisibility('password')}
            onTogglePassword={() => togglePassword('password')}
          />

          {/* ==================== CONFIRM PASSWORD FIELD ==================== */}
          <FormField
            name="confirmPassword"
            type="password"
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Nhập lại mật khẩu của bạn"
            startIcon={<Lock color="action" sx={{ fontSize: '1.2rem' }} />}
            showPassword={getVisibility('confirmPassword')}
            onTogglePassword={() => togglePassword('confirmPassword')}
          />

          {/* ==================== SUBMIT BUTTON ==================== */}
          <SubmitButton loading={loading || isSubmitting} sx={{ mt: 1 }}>
            Đăng Ký
          </SubmitButton>

          {/* ==================== DIVIDER ==================== */}
          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              Hoặc
            </Typography>
          </Divider>

          {/* ==================== GOOGLE BUTTON ==================== */}
          <SocialButton
            icon={<GoogleIcon sx={{ fontSize: '1.2rem' }} />}
            onClick={handleGoogleRegister}
          >
            Đăng ký với Google
          </SocialButton>

          {/* ==================== TERMS ==================== */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              pt: 1,
              opacity: 0.8,
            }}
          >
            Bằng việc đăng ký, bạn đồng ý với{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "primary.main",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              Điều khoản sử dụng
            </Typography>{" "}
            và{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "primary.main",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              Chính sách bảo mật
            </Typography>{" "}
            của chúng tôi.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterForm;