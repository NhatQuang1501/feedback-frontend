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

export const validateStrongPassword = (password) => {
  const errors = validatePassword(password);

  if (!errors.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.password = "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
  }

  return errors;
};

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

export const validateFullName = (fullName) => {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = "Họ và tên là bắt buộc";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
  } else if (fullName.trim().length > 100) {
    errors.fullName = "Họ và tên không được quá 100 ký tự";
  }

  return errors;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = {};

  if (!confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

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

export const validateRegisterForm = (formData) => {
  const errors = {
    ...validateFullName(formData.fullName),
    ...validateEmailAuth(formData.email),
    ...validateStrongPassword(formData.password),
    ...validateConfirmPassword(formData.password, formData.confirmPassword),
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const validateForgotPasswordForm = (email) => {
  const errors = validateEmailAuth(email);

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

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

export const validateFeedbackForm = (data) => {
  const errors = {};
  let isValid = true;

  // Validate title
  if (!data.title || data.title.trim() === "") {
    errors.title = "Tiêu đề không được để trống";
    isValid = false;
  } else if (data.title.length < 5) {
    errors.title = "Tiêu đề phải có ít nhất 5 ký tự";
    isValid = false;
  }

  // Validate content
  if (!data.content || data.content.trim() === "") {
    errors.content = "Nội dung không được để trống";
    isValid = false;
  } else if (data.content.length < 10) {
    errors.content = "Nội dung phải có ít nhất 10 ký tự";
    isValid = false;
  }

  // Validate type
  if (!data.type) {
    errors.type = "Vui lòng chọn loại phản hồi";
    isValid = false;
  }

  // Validate priority
  if (!data.priority) {
    errors.priority = "Vui lòng chọn mức độ ưu tiên";
    isValid = false;
  }

  return { isValid, errors };
};
