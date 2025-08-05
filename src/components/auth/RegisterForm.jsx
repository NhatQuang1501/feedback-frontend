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
  Stack,
  Grid,
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
    <Box>
      {/* ==================== ERROR ALERT ==================== */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* ==================== REGISTER FORM ==================== */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          {/* ==================== NAME FIELDS ==================== */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
                      <Person color="action" sx={{ fontSize: "1.2rem" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Nhập họ của bạn"
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
            </Grid>
            <Grid item xs={6}>
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
                    height: 56,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1rem",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              />
            </Grid>
          </Grid>

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

          {/* ==================== CONFIRM PASSWORD FIELD ==================== */}
          <TextField
            fullWidth
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" sx={{ fontSize: "1.2rem" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    size="small"
                    sx={{ mr: 0.5 }}
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
              mt: 1,
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng Ký"}
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
            onClick={handleGoogleRegister}
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
            Đăng ký với Google
          </Button>

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
