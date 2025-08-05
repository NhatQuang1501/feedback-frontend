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
  Stack,
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
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* ==================== LOGIN FORM ==================== */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          {/* ==================== EMAIL FIELD ==================== */}
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" sx={{ fontSize: "1.2rem" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Nhập email của bạn"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: 56,
                "& .MuiInputAdornment-root": {
                  marginLeft: 0,
                },
              },
              "& .MuiInputBase-input": {
                paddingLeft: 1,
                fontSize: "1rem",
              },
              "& .MuiFormLabel-root": {
                fontSize: "1rem",
              },
            }}
          />

          {/* ==================== PASSWORD FIELD ==================== */}
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            label="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" sx={{ fontSize: "1.2rem" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    size="small"
                    sx={{ mr: 0.5 }}
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
                height: 56,
                "& .MuiInputAdornment-root": {
                  marginLeft: 0,
                },
              },
              "& .MuiInputBase-input": {
                paddingLeft: 1,
                fontSize: "1rem",
              },
              "& .MuiFormLabel-root": {
                fontSize: "1rem",
              },
            }}
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
                fontSize: "0.875rem",
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
              height: 52,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                backgroundColor: "action.disabledBackground",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng Nhập"}
          </Button>

          {/* ==================== DIVIDER ==================== */}
          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              Hoặc
            </Typography>
          </Divider>

          {/* ==================== GOOGLE BUTTON ==================== */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon sx={{ fontSize: "1.2rem" }} />}
            onClick={handleGoogleLogin}
            sx={{
              height: 52,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
              borderColor: "divider",
              borderWidth: 1.5,
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                borderWidth: 1.5,
                transform: "translateY(-1px)",
                boxShadow: 2,
              },
            }}
          >
            Đăng nhập với Google
          </Button>
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
