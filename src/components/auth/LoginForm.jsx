import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import GoogleIcon from "@mui/icons-material/Google";

const LoginForm = ({ onLogin, loading = false, error = null, onSwitchToRegister }) => {
  // ==================== STATE ====================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onLogin(formData);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* ==================== LOGIN FORM ==================== */}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Nhập email của bạn"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          name="password"
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Nhập mật khẩu của bạn"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {/* ==================== FORGOT PASSWORD ==================== */}
        <Box sx={{ textAlign: "right", marginTop: 1, marginBottom: 2 }}>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={handleForgotPasswordOpen}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Quên mật khẩu?
          </Link>
        </Box>

        {/* ==================== SUBMIT BUTTON ==================== */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            marginTop: 1,
            marginBottom: 2,
            height: 48,
            borderRadius: 2,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng Nhập"}
        </Button>

        {/* ==================== DIVIDER ==================== */}
        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        {/* ==================== GOOGLE BUTTON ==================== */}
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            marginBottom: 2,
            height: 48,
            borderRadius: 2,
            textTransform: "none",
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
        >
          Đăng nhập với Google
        </Button>
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
