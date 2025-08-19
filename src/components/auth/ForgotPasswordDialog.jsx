import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";

// Custom components
import FormField from "../common/FormField";
import SubmitButton from "../common/SubmitButton";

// Hooks and utils
import { useForm } from "../../hooks/useForm";
import { validateForgotPasswordForm } from "../../utils/validation";

const ForgotPasswordDialog = ({ open, onClose, onSuccess = null }) => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    { email: "" },
    (data) => validateForgotPasswordForm(data.email),
  );

  const [success, setSuccess] = React.useState(false);

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-3xl p-2 max-w-lg",
      }}
      disableBackdropClick={isSubmitting}
      disableEscapeKeyDown={isSubmitting}
    >
      <DialogTitle className="pt-6 pb-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Email className="text-3xl text-[#ffec99]" />
          <Typography variant="h5" component="span" className="font-semibold text-gray-800">
            Quên Mật Khẩu
          </Typography>
        </div>
      </DialogTitle>

      <DialogContent className="px-6 py-4">
        {!success ? (
          <form onSubmit={handleFormSubmit} className="w-full">
            <div className="space-y-6">
              <Typography
                variant="body1"
                className="text-center text-base leading-relaxed text-gray-600"
              >
                Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
              </Typography>

              <div className="space-y-1">
                <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                  Địa chỉ email
                </Typography>
                <FormField
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  error={errors.email}
                  startIcon={<Email className="text-xl text-gray-500" />}
                  disabled={isSubmitting}
                  autoFocus
                  className="w-full"
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-4 text-center">
            <Alert severity="success" className="rounded-lg">
              <div className="text-left">
                <Typography variant="body1" className="mb-2 font-semibold">
                  Email đã được gửi thành công!
                </Typography>
                <Typography variant="body2" className="mb-2 opacity-90">
                  Chúng tôi đã gửi link đặt lại mật khẩu đến:
                </Typography>
                <Typography variant="body2" className="mb-2 font-semibold text-[#e6d486]">
                  {formData.email}
                </Typography>
                <Typography variant="body2" className="text-sm italic opacity-80">
                  Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam)
                </Typography>
              </div>
            </Alert>

            <Typography variant="body2" className="text-sm text-gray-500">
              Dialog sẽ tự động đóng sau 3 giây...
            </Typography>
          </div>
        )}
      </DialogContent>

      <DialogActions className="justify-between p-6 pt-4">
        {!success ? (
          <div className="flex w-full justify-between gap-4">
            <Button
              onClick={handleClose}
              startIcon={<ArrowBack />}
              disabled={isSubmitting}
              className="rounded-lg px-4 py-2 text-base text-gray-600 normal-case transition-colors duration-200 hover:bg-gray-100"
            >
              Quay lại
            </Button>

            <SubmitButton
              onClick={handleFormSubmit}
              loading={isSubmitting}
              disabled={!formData.email.trim()}
              className="min-w-36 px-6 py-2 text-base"
            >
              Gửi Email
            </SubmitButton>
          </div>
        ) : (
          <SubmitButton onClick={handleClose} fullWidth className="py-3 text-base">
            Đóng
          </SubmitButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
