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
          borderRadius: 2,
          padding: 1,
        },
      }}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      {/* ==================== DIALOG TITLE ==================== */}
      <DialogTitle sx={{ textAlign: "center", paddingBottom: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Email color="primary" />
          <Typography variant="h6" component="span">
            Quên Mật Khẩu
          </Typography>
        </Box>
      </DialogTitle>

      {/* ==================== DIALOG CONTENT ==================== */}
      <DialogContent sx={{ paddingTop: 2 }}>
        {!success ? (
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginBottom: 3,
                textAlign: "center",
                lineHeight: 1.6,
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
              margin="normal"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              placeholder="Nhập email của bạn"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <Alert
              severity="success"
              sx={{
                marginBottom: 2,
                borderRadius: 2,
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Email đã được gửi thành công!
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Chúng tôi đã gửi link đặt lại mật khẩu đến:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 0.5,
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                {email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 1,
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                }}
              >
                Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam)
              </Typography>
            </Alert>

            <Typography variant="body2" color="text.secondary">
              Dialog sẽ tự động đóng sau 3 giây...
            </Typography>
          </Box>
        )}
      </DialogContent>

      {/* ==================== DIALOG ACTIONS ==================== */}
      <DialogActions sx={{ padding: 2, justifyContent: "space-between" }}>
        {!success ? (
          <>
            <Button
              onClick={handleClose}
              startIcon={<ArrowBack />}
              disabled={loading}
              sx={{
                textTransform: "none",
                color: "text.secondary",
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
                minWidth: 120,
                borderRadius: 2,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
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
