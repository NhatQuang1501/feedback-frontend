// ==================== EMAIL VALIDATION ====================
export const validateEmail = (email) => {
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
    ...validateEmail(formData.email),
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
    ...validateEmail(formData.email),
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
  const errors = validateEmail(email);
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};