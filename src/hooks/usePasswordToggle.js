import { useState } from "react";

// ==================== PASSWORD TOGGLE HOOK ====================
export const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    togglePassword,
  };
};

// ==================== MULTIPLE PASSWORD TOGGLE HOOK ====================
export const useMultiplePasswordToggle = (fields = []) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field] = false;
    return acc;
  }, {});

  const [passwordVisibility, setPasswordVisibility] = useState(initialState);

  const togglePassword = (fieldName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const getVisibility = (fieldName) => passwordVisibility[fieldName] || false;

  return {
    passwordVisibility,
    togglePassword,
    getVisibility,
  };
};
