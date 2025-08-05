import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  // InputLabel,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormHelperText,
  Snackbar,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import { submitFeedback, resetSubmitState } from "@/store/slices/feedbackSlice";
import { FEEDBACK_TYPES, PRIORITY_LEVELS } from "@/utils/constants";
import { validateFeedbackForm } from "@/utils/validation";
import FileUpload from "./FileUpload";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const { isSubmitting, submitSuccess, submitError } = useSelector((state) => state.feedback);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    content: "",
    type: "",
    priority: "",
    attachments: [],
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (submitSuccess) {
      setShowSuccess(true);
      setFormData({
        fullName: "",
        email: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateFeedbackForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    const submitData = {
      ...formData,
      attachments: formData.attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    };

    dispatch(submitFeedback(submitData));
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      content: "",
      type: "",
      priority: "",
      attachments: [],
    });
    setErrors({});
    dispatch(resetSubmitState());
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    dispatch(resetSubmitState());
  };

  return (
    <>
      <CardContent className="bg-white p-6 sm:p-8 md:p-10">
        <form onSubmit={handleSubmit}>
          {/* Information */}
          <div className="mb-12">
            <Typography variant="h6" className="mb-6 border-b pb-2 font-bold text-gray-800">
              Thông tin cá nhân
            </Typography>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="space-y-2">
                <Typography variant="subtitle2" className="mb-1 text-gray-700">
                  Họ và tên
                </Typography>
                <TextField
                  fullWidth
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  variant="outlined"
                  className="bg-gray-50/50"
                  InputProps={{
                    className: "rounded-md",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Typography variant="subtitle2" className="mb-1 text-gray-700">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  className="bg-gray-50/50"
                  InputProps={{
                    className: "rounded-md",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="mb-12">
            <Typography variant="h6" className="mb-6 border-b pb-2 font-bold text-gray-800">
              Nội dung phản hồi
            </Typography>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="space-y-2">
                <Typography variant="subtitle2" className="mb-1 text-gray-700">
                  Loại phản hồi
                </Typography>
                <FormControl fullWidth error={!!errors.type} className="bg-gray-50/50">
                  {/* <InputLabel>Loại phản hồi *</InputLabel> */}
                  <Select
                    value={formData.type}
                    onChange={handleInputChange("type")}
                    label="Loại phản hồi *"
                    className="rounded-md"
                  >
                    {FEEDBACK_TYPES.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
                </FormControl>
              </div>

              <div className="space-y-2">
                <Typography variant="subtitle2" className="mb-1 text-gray-700">
                  Mức độ ưu tiên
                </Typography>
                <FormControl fullWidth error={!!errors.priority} className="bg-gray-50/50">
                  {/* <InputLabel>Mức độ ưu tiên *</InputLabel> */}
                  <Select
                    value={formData.priority}
                    onChange={handleInputChange("priority")}
                    label="Mức độ ưu tiên *"
                    className="rounded-md"
                  >
                    {PRIORITY_LEVELS.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
                </FormControl>
              </div>
            </div>

            {/* Content - Moved outside the grid to be full width */}
            <div className="mt-10 space-y-2">
              <Typography variant="subtitle2" className="mb-1 text-gray-700">
                Chi tiết phản hồi
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={formData.content}
                onChange={handleInputChange("content")}
                error={!!errors.content}
                helperText={
                  errors.content || "Mô tả chi tiết vấn đề hoặc ý kiến của bạn (tối thiểu 10 ký tự)"
                }
                variant="outlined"
                className="bg-gray-50/50"
                InputProps={{
                  className: "rounded-md",
                }}
              />
            </div>
          </div>

          {/* Attachments - Moved to be more balanced in layout */}
          <div className="mb-12">
            <Typography variant="h6" className="mb-4 border-b pb-2 font-bold text-gray-800">
              Tệp đính kèm
            </Typography>
            <Typography variant="body2" className="mb-2 text-gray-500">
              Bạn có thể đính kèm tài liệu hỗ trợ dưới định dạng: PNG, JPG, PDF, DOCX...
            </Typography>
            <FileUpload onFilesChange={handleFilesChange} error={errors.attachments} />
          </div>

          {submitError && (
            <Alert severity="error" className="mb-8 rounded-lg">
              {submitError}
            </Alert>
          )}

          <Divider className="mb-8" />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
              startIcon={<RefreshIcon />}
              disabled={isSubmitting}
              className="h-12 rounded-full sm:min-w-[160px]"
              size="large"
              color="secondary"
            >
              Làm mới
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
              disabled={isSubmitting}
              className="h-12 rounded-full sm:min-w-[160px]"
              size="large"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
            </Button>
          </div>
        </form>
      </CardContent>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" variant="filled" className="w-full">
          Gửi phản hồi thành công! Chúng tôi sẽ phản hồi qua email trong thời gian sớm nhất.
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
