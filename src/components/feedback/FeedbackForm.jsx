import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardContent, Typography, Alert, Snackbar, Box, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import { submitFeedback, resetSubmitState } from "@/store/slices/feedbackSlice";
import { FEEDBACK_TYPES, PRIORITY_LEVELS } from "@/utils/constants";
import { validateFeedbackForm } from "@/utils/validation";
import FileUpload from "./FileUpload";
import TextField from "@/components/common/TextField";
import CustomSelect from "@/components/common/CustomSelect";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const { isSubmitting, submitSuccess, submitError } = useSelector((state) => state.feedback);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    content: "",
    type: "",
    priority: "",
    attachments: [],
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState("submit");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (submitSuccess) {
      setShowSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        title: "",
        content: "",
        type: "",
        priority: "",
        attachments: [],
      });
      setErrors({});
    }
  }, [submitSuccess]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFilesChange = (files) => {
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  const handleConfirmSubmit = (event) => {
    event.preventDefault();

    const validation = validateFeedbackForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setConfirmDialogType("submit");
    setConfirmAction(() => () => handleSubmit());
    setConfirmDialogOpen(true);
  };

  const handleConfirmReset = () => {
    const hasData = Object.values(formData).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "";
    });

    if (!hasData) {
      handleReset();
      return;
    }

    setConfirmDialogType("warning");
    setConfirmAction(() => handleReset);
    setConfirmDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setConfirmDialogOpen(false);
  };

  const handleSubmit = async () => {
    setErrors({});

    const submitData = {
      ...formData,
      attachments: formData.attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        content: file.base64,
      })),
    };

    try {
      await dispatch(submitFeedback(submitData)).unwrap();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      title: "",
      content: "",
      type: "",
      priority: "",
      attachments: [],
    });
    setErrors({});
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
    dispatch(resetSubmitState());
  };

  return (
    <>
      <CardContent className="p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleConfirmSubmit} className="space-y-6">
          {/* Error Alert */}
          {submitError && (
            <Alert severity="error" className="mb-4">
              Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại!
            </Alert>
          )}

          {/* Personal Information */}
          <Box className="relative mb-8">
            <Typography
              variant="h5"
              className="mb-4 flex items-center border-b pb-2 text-[1.1rem] font-semibold text-gray-800 sm:text-[1.25rem]"
            >
              <Box className="bg-primary-main mr-2 h-5 w-1 rounded-full" component="span"></Box>
              Thông tin cá nhân
            </Typography>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-1">
                <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                  Họ và tên
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  variant="outlined"
                  className="bg-gray-50/50 [&_.MuiOutlinedInput-input]:pl-4 [&_.MuiOutlinedInput-root]:h-14 [&_.MuiOutlinedInput-root]:text-base"
                  InputProps={{
                    className:
                      "rounded-lg border border-gray-300 hover:border-primary-main focus:border-primary-dark",
                  }}
                />
              </div>
              <div className="space-y-1">
                <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="yourname@example.com"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  className="bg-gray-50/50 [&_.MuiOutlinedInput-input]:pl-4 [&_.MuiOutlinedInput-root]:h-14 [&_.MuiOutlinedInput-root]:text-base"
                  InputProps={{
                    className:
                      "rounded-lg border border-gray-300 hover:border-primary-main focus:border-primary-dark",
                  }}
                />
              </div>
            </div>
          </Box>

          {/* Type */}
          <Box className="relative mb-8">
            <Typography
              variant="h5"
              className="mb-4 flex items-center border-b pb-2 text-[1.1rem] font-semibold text-gray-800 sm:text-[1.25rem]"
            >
              <Box className="bg-primary-main mr-2 h-5 w-1 rounded-full" component="span"></Box>
              Nội dung phản hồi
            </Typography>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-1">
                <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                  Loại phản hồi
                </Typography>
                <CustomSelect
                  value={formData.type}
                  onChange={handleInputChange("type")}
                  options={FEEDBACK_TYPES}
                  placeholder="Chọn loại phản hồi"
                  error={errors.type}
                  size="large"
                />
              </div>

              <div className="space-y-1">
                <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                  Mức độ ưu tiên
                </Typography>
                <CustomSelect
                  value={formData.priority}
                  onChange={handleInputChange("priority")}
                  options={PRIORITY_LEVELS}
                  placeholder="Chọn mức độ ưu tiên"
                  error={errors.priority}
                  size="large"
                />
              </div>
            </div>

            {/* Title - Thêm trường tiêu đề */}
            <div className="mt-6 space-y-1">
              <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                Tiêu đề
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập tiêu đề phản hồi"
                value={formData.title}
                onChange={handleInputChange("title")}
                error={!!errors.title}
                helperText={errors.title}
                variant="outlined"
                className="bg-gray-50/50 [&_.MuiOutlinedInput-input]:pl-4 [&_.MuiOutlinedInput-root]:h-14 [&_.MuiOutlinedInput-root]:text-base"
                InputProps={{
                  className:
                    "rounded-lg border border-gray-300 hover:border-primary-main focus:border-primary-dark",
                }}
              />
            </div>

            {/* Content */}
            <div className="mt-6 space-y-1">
              <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
                Chi tiết phản hồi
              </Typography>
              <div className="relative">
                <TextareaAutosize
                  minRows={4}
                  placeholder="Mô tả chi tiết vấn đề hoặc ý kiến của bạn..."
                  value={formData.content}
                  onChange={handleInputChange("content")}
                  className={`w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-base leading-6 transition-colors ${
                    errors.content
                      ? "border-red-500 focus:border-red-500 focus:ring focus:ring-red-200"
                      : "border-gray-300 hover:border-amber-600 focus:border-amber-600 focus:ring focus:ring-amber-100"
                  }`}
                  style={{ minHeight: "50px", resize: "vertical" }}
                />
                <Typography
                  variant="caption"
                  className={`mt-1 block text-sm ${
                    errors.content ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {errors.content ||
                    "Mô tả chi tiết vấn đề hoặc ý kiến của bạn (tối thiểu 10 ký tự)"}
                </Typography>
              </div>
            </div>
          </Box>

          {/* Attachments */}
          <Box className="relative mb-8">
            <Typography
              variant="h5"
              className="mb-4 flex items-center border-b pb-2 text-[1.1rem] font-semibold text-gray-800 sm:text-[1.25rem]"
            >
              <Box className="bg-primary-main mr-2 h-5 w-1 rounded-full" component="span"></Box>
              Tệp đính kèm
            </Typography>

            <Typography variant="body2" className="mb-3 text-gray-500">
              Bạn có thể đính kèm tài liệu hỗ trợ dưới định dạng: PNG, JPG, PDF, DOCX...
            </Typography>
            <FileUpload onFilesChange={handleFilesChange} error={errors.attachments} />
          </Box>

          {/* Actions */}
          <Box className="flex flex-col justify-center gap-3 pt-4 sm:flex-row sm:gap-6">
            <Button
              variant="outlined"
              size="large"
              onClick={handleConfirmReset}
              startIcon={<RefreshIcon />}
              disabled={isSubmitting}
              className="border text-amber-400 hover:border-amber-500 hover:text-amber-500 sm:order-1 sm:w-40"
            >
              Làm mới
            </Button>
            <Button
              variant="primary"
              size="large"
              type="submit"
              startIcon={<SendIcon />}
              loading={isSubmitting}
              className="sm:order-2 sm:w-45"
            >
              Gửi phản hồi
            </Button>
          </Box>
        </form>
      </CardContent>

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        title={confirmDialogType === "submit" ? "Xác nhận gửi phản hồi" : "Xác nhận làm mới"}
        content={
          confirmDialogType === "submit"
            ? "Bạn có chắc chắn muốn gửi phản hồi này không?"
            : "Bạn có chắc chắn muốn làm mới form và xóa tất cả thông tin đã nhập không?"
        }
        confirmText={confirmDialogType === "submit" ? "Gửi phản hồi" : "Làm mới"}
        cancelText="Hủy bỏ"
        type={confirmDialogType}
        loading={isSubmitting && confirmDialogType === "submit"}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" className="w-full">
          Phản hồi của bạn đã được gửi thành công! Cảm ơn bạn đã đóng góp ý kiến.
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
