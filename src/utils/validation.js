import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "./constants";

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.trim().length >= minLength;
};

export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFeedbackForm = (formData) => {
  const errors = {};

  // Name
  if (!validateRequired(formData.fullName)) {
    errors.fullName = "Vui lòng nhập họ tên";
  }
  // Email
  if (!validateRequired(formData.email)) {
    errors.email = "Vui lòng nhập email";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Email không hợp lệ";
  }
  // Feedback content
  if (!validateRequired(formData.content)) {
    errors.content = "Vui lòng nhập nội dung phản hồi";
  } else if (!validateMinLength(formData.content, 10)) {
    errors.content = "Nội dung phản hồi phải có ít nhất 10 ký tự";
  }
  // Type
  if (!validateRequired(formData.type)) {
    errors.type = "Vui lòng chọn loại phản hồi";
  }
  // Priority
  if (!validateRequired(formData.priority)) {
    errors.priority = "Vui lòng chọn mức độ ưu tiên";
  }
  // File
  if (formData.file) {
    if (!validateFileSize(formData.file, MAX_FILE_SIZE)) {
      errors.file = "Kích thước file không được vượt quá 5MB";
    }
    if (!validateFileType(formData.file, ALLOWED_FILE_TYPES)) {
      errors.file = "Định dạng file không hợp lệ";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
