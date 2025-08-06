// ==================== EMAIL VALIDATION ====================
export const validateEmailAuth = (email) => {
  const errors = {};

  if (!email) {
    errors.email = "Email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email không hợp lệ";
  } else if (email.length > 100) {
    errors.email = "Email không được quá 100 ký tự";
  }

  return errors;
};

// ==================== PASSWORD VALIDATION ====================
export const validatePassword = (password) => {
  const errors = {};

  if (!password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  } else if (password.length > 100) {
    errors.password = "Mật khẩu không được quá 100 ký tự";
  }

  return errors;
};

// ==================== STRONG PASSWORD VALIDATION ====================
export const validateStrongPassword = (password) => {
  const errors = validatePassword(password);

  if (!errors.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.password = "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
  }

  return errors;
};

// ==================== NAME VALIDATION ====================
export const validateName = (name, fieldName) => {
  const errors = {};
  const key = fieldName.toLowerCase();

  if (!name.trim()) {
    errors[key] = `${fieldName} là bắt buộc`;
  } else if (name.trim().length < 2) {
    errors[key] = `${fieldName} phải có ít nhất 2 ký tự`;
  } else if (name.trim().length > 50) {
    errors[key] = `${fieldName} không được quá 50 ký tự`;
  }

  return errors;
};

// ==================== CONFIRM PASSWORD VALIDATION ====================
export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = {};

  if (!confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

// ==================== LOGIN FORM VALIDATION ====================
export const validateLoginForm = (formData) => {
  const errors = {
    ...validateEmailAuth(formData.email),
    ...validatePassword(formData.password),
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// ==================== REGISTER FORM VALIDATION ====================
export const validateRegisterForm = (formData) => {
  const errors = {
    ...validateName(formData.firstName, "Họ"),
    ...validateName(formData.lastName, "Tên"),
    ...validateEmailAuth(formData.email),
    ...validateStrongPassword(formData.password),
    ...validateConfirmPassword(formData.password, formData.confirmPassword),
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// ==================== FORGOT PASSWORD VALIDATION ====================
export const validateForgotPasswordForm = (email) => {
  const errors = validateEmailAuth(email);

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
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
