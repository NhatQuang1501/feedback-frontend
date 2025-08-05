import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";

const ForgotPasswordDialog = ({ open, onClose, onSuccess = null }) => {
  // ==================== STATE ====================
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ==================== HANDLERS ====================
  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email là bắt buộc");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);

      if (onSuccess) {
        onSuccess(email);
      }

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && !success) {
      handleSubmit();
    }
  };

  // ==================== RENDER ====================
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
          maxWidth: 480,
        },
      }}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      {/* ==================== DIALOG TITLE ==================== */}
      <DialogTitle sx={{ textAlign: "center", pb: 2, pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Email color="primary" sx={{ fontSize: "1.8rem" }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Quên Mật Khẩu
          </Typography>
        </Box>
      </DialogTitle>

      {/* ==================== DIALOG CONTENT ==================== */}
      <DialogContent sx={{ px: 3, py: 2 }}>
        {!success ? (
          <Stack spacing={3}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: "center",
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              error={!!error}
              helperText={error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" sx={{ fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Nhập email của bạn"
              autoFocus
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
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ textAlign: "center", py: 2 }}>
            <Alert
              severity="success"
              sx={{
                borderRadius: 2,
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Email đ�� được gửi thành công!
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                Chúng tôi đã gửi link đặt lại mật khẩu đến:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 1,
                }}
              >
                {email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  opacity: 0.8,
                }}
              >
                Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam)
              </Typography>
            </Alert>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              Dialog sẽ tự động đóng sau 3 giây...
            </Typography>
          </Stack>
        )}
      </DialogContent>

      {/* ==================== DIALOG ACTIONS ==================== */}
      <DialogActions sx={{ p: 3, pt: 2, justifyContent: "space-between" }}>
        {!success ? (
          <>
            <Button
              onClick={handleClose}
              startIcon={<ArrowBack />}
              disabled={loading}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                borderRadius: 2,
                px: 2,
                py: 1,
                fontSize: "0.95rem",
              }}
            >
              Quay lại
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading || !email.trim()}
              sx={{
                textTransform: "none",
                minWidth: 140,
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                  Đang gửi...
                </>
              ) : (
                "Gửi Email"
              )}
            </Button>
          </>
        ) : (
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Đóng
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
