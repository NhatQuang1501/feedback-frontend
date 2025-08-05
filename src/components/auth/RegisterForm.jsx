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
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

const RegisterForm = ({ onRegister, loading = false, error = null, onSwitchToLogin }) => {
  // ==================== STATE ====================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Họ là bắt buộc";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Họ phải có ít nhất 2 ký tự";
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = "Họ không được quá 50 ký tự";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Tên là bắt buộc";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Tên phải có ít nhất 2 ký tự";
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = "Tên không được quá 50 ký tự";
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email không được quá 100 ký tự";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (formData.password.length > 100) {
      newErrors.password = "Mật khẩu không được quá 100 ký tự";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      onRegister(registerData);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  // ==================== RENDER ====================
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* ==================== ERROR ALERT ==================== */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* ==================== NAME FIELDS ==================== */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          name="firstName"
          label="Họ"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Nhập họ của bạn"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          name="lastName"
          label="Tên"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          placeholder="Nhập tên của bạn"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

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

      {/* ==================== PASSWORD FIELDS ==================== */}
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

      <TextField
        fullWidth
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        label="Xác nhận mật khẩu"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
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
                onClick={handleToggleConfirmPassword}
                edge="end"
                aria-label="toggle confirm password visibility"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Nhập lại mật khẩu của bạn"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      {/* ==================== SUBMIT BUTTON ==================== */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          marginTop: 3,
          marginBottom: 2,
          height: 48,
          borderRadius: 2,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng Ký"}
      </Button>

      {/* ==================== DIVIDER ==================== */}
      <Divider sx={{ my: 2 }}>Hoặc</Divider>

      {/* ==================== GOOGLE BUTTON ==================== */}
      <Button
        fullWidth
        variant="outlined"
        size="large"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleRegister}
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
        Đăng ký với Google
      </Button>

      {/* ==================== TERMS ==================== */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          marginTop: 2,
          fontSize: "0.875rem",
          lineHeight: 1.5,
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
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Chính sách bảo mật
        </Typography>{" "}
        của chúng tôi.
      </Typography>
    </Box>
  );
};

export default RegisterForm;
