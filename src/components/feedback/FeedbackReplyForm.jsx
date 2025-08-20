import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const FeedbackReplyForm = ({ open, onClose, onSubmit, feedbackId }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (error && e.target.value.trim().length >= 10) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (content.trim().length < 10) {
      setError("Nội dung phản hồi phải có ít nhất 10 ký tự");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ feedbackId, content });
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error submitting reply:", error);
      setError("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-xl",
      }}
    >
      <DialogTitle className="border-b border-gray-200 px-6 py-4">
        <Box className="flex items-center justify-between">
          <Typography variant="h6" className="font-bold text-gray-900">
            Phản hồi
          </Typography>
          <Button
            onClick={onClose}
            className="min-w-0 p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent className="p-6">
        <Typography variant="body2" className="mb-3 text-gray-600">
          Nhập nội dung phản hồi của bạn:
        </Typography>
        <TextareaAutosize
          minRows={6}
          placeholder="Nhập nội dung phản hồi..."
          value={content}
          onChange={handleContentChange}
          className={`w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-base leading-6 transition-colors ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring focus:ring-red-200"
              : "border-gray-300 hover:border-amber-600 focus:border-amber-600 focus:ring focus:ring-amber-100"
          }`}
          style={{ resize: "vertical" }}
        />
        {error && <Typography className="mt-1 text-sm text-red-500">{error}</Typography>}
      </DialogContent>
      <DialogActions className="border-t border-gray-200 p-4">
        <Button
          onClick={onClose}
          variant="outlined"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          className="bg-amber-500 text-white hover:bg-amber-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FeedbackReplyForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  feedbackId: PropTypes.string.isRequired,
};

export default FeedbackReplyForm;
