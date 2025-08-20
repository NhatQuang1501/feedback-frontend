import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  type = "warning",
  loading = false,
}) => {
  const dialogConfig = {
    delete: {
      icon: <DeleteIcon fontSize="large" />,
      iconColor: "text-red-600",
      confirmBtnClass: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg",
      confirmBtnVariant: "contained",
    },
    submit: {
      icon: <SendIcon fontSize="large" />,
      iconColor: "text-amber-600",
      confirmBtnClass: "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg",
      confirmBtnVariant: "contained",
    },
    warning: {
      icon: <WarningIcon fontSize="large" />,
      iconColor: "text-orange-500",
      confirmBtnClass: "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg",
      confirmBtnVariant: "contained",
    },
    info: {
      icon: <InfoIcon fontSize="large" />,
      iconColor: "text-blue-500",
      confirmBtnClass: "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg",
      confirmBtnVariant: "outlined",
    },
    success: {
      icon: <CheckIcon fontSize="large" />,
      iconColor: "text-green-500",
      confirmBtnClass: "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg",
      confirmBtnVariant: "contained",
    },
  };

  const config = dialogConfig[type] || dialogConfig.warning;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      PaperProps={{
        className: "rounded-xl overflow-hidden",
        sx: {
          width: "100%",
          maxWidth: { xs: "90%", sm: "450px" },
        },
      }}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title" className="px-6 pt-4 pb-2">
        <Box className="flex items-center gap-3">
          <span className={config.iconColor}>{config.icon}</span>
          <Typography variant="h6" component="span" className="font-semibold text-gray-800">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent className="px-6 pt-2 pb-4">
        <DialogContentText id="confirm-dialog-description" className="text-gray-700">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-end gap-3 bg-gray-50 px-6 py-4">
        <Button
          onClick={onClose}
          disabled={loading}
          className={`min-w-[100px] rounded-xl border-2 border-gray-600 bg-white px-4 py-2 text-base font-semibold text-gray-600 normal-case transition-all duration-200 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:shadow-lg disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none`}
          variant="outlined"
          startIcon={<CloseIcon fontSize="small" />}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          className={`min-w-[100px] rounded-xl ${config.confirmBtnClass} px-4 py-2 text-base font-semibold normal-case transition-all duration-200 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none`}
          variant={config.confirmBtnVariant}
          startIcon={
            type === "submit" ? loading ? null : <SendIcon fontSize="small" /> : config.icon
          }
        >
          {loading ? "Đang xử lý..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(["delete", "submit", "warning", "info", "success"]),
  loading: PropTypes.bool,
};

export default ConfirmDialog;
