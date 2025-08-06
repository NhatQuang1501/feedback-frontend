import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";

// Custom components
import FormField from "../common/FormField";
import SubmitButton from "../common/SubmitButton";

// Hooks and utils
import { useForm } from "../../hooks/useForm";
import { validateForgotPasswordForm } from "../../utils/validation";

// ==================== FORGOT PASSWORD DIALOG COMPONENT ====================
const ForgotPasswordDialog = ({ open, onClose, onSuccess = null }) => {
  // ==================== HOOKS ====================
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm(
    { email: "" },
    (data) => validateForgotPasswordForm(data.email)
  );

  const [success, setSuccess] = React.useState(false);

  // ==================== HANDLERS ====================
  const handleClose = () => {
    resetForm();
    setSuccess(false);
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const submitSuccess = await handleSubmit(async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Gửi email reset password đến:", data.email);
      setSuccess(true);

      if (onSuccess) {
        onSuccess(data.email);
      }

      // Auto close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSubmitting && !success) {
      handleFormSubmit(e);
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
      disableBackdropClick={isSubmitting}
      disableEscapeKeyDown={isSubmitting}
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
          <Email color="primary" sx={{ fontSize: '1.8rem' }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Quên Mật Khẩu
          </Typography>
        </Box>
      </DialogTitle>

      {/* ==================== DIALOG CONTENT ==================== */}
      <DialogContent sx={{ px: 3, py: 2 }}>
        {!success ? (
          <Box component="form" onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  lineHeight: 1.6,
                  fontSize: '1rem',
                }}
              >
                Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
              </Typography>

              <FormField
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.email}
                placeholder="Nhập email của bạn"
                startIcon={<Email color="action" sx={{ fontSize: '1.2rem' }} />}
                disabled={isSubmitting}
                autoFocus
              />
            </Stack>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ textAlign: "center", py: 2 }}>
            <Alert
              severity="success"
              sx={{
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: "100%",
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Email đã được gửi thành công!
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
                {formData.email}
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

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
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
              disabled={isSubmitting}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                borderRadius: 2,
                px: 2,
                py: 1,
                fontSize: '0.95rem',
              }}
            >
              Quay lại
            </Button>

            <SubmitButton
              onClick={handleFormSubmit}
              loading={isSubmitting}
              disabled={!formData.email.trim()}
              sx={{
                minWidth: 140,
                px: 3,
                py: 1,
                fontSize: '0.95rem',
              }}
            >
              Gửi Email
            </SubmitButton>
          </>
        ) : (
          <SubmitButton
            onClick={handleClose}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            Đóng
          </SubmitButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;