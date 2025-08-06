import React, { useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Link,
  Divider,
  Stack,
} from "@mui/material";
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
const LoginForm = ({ onLogin, loading = false, error = null, onSwitchToRegister }) => {
  // ==================== HOOKS ====================
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { showPassword, togglePassword } = usePasswordToggle();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      email: "",
      password: "",
    },
    validateLoginForm
  );

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

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
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

      {/* ==================== LOGIN FORM ==================== */}
      <Box component="form" onSubmit={handleFormSubmit}>
        <Stack spacing={2.5}>
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
            showPassword={showPassword}
            onTogglePassword={togglePassword}
          />

          {/* ==================== FORGOT PASSWORD ==================== */}
          <Box sx={{ textAlign: "right", mt: -1 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={handleForgotPasswordOpen}
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontSize: '0.875rem',
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          {/* ==================== SUBMIT BUTTON ==================== */}
          <SubmitButton loading={loading || isSubmitting}>
            Đăng Nhập
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
            onClick={handleGoogleLogin}
          >
            Đăng nhập với Google
          </SocialButton>
        </Stack>
      </Box>

      {/* ==================== FORGOT PASSWORD DIALOG ==================== */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        onSuccess={handleForgotPasswordSuccess}
      />
    </Box>
  );
};

export default LoginForm;