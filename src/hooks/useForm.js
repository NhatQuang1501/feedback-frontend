import { useState } from "react";


export const useForm = (initialValues, validationFn) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (onSubmit) => {
    const validation = validationFn(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      return true;
    } catch (error) {
      console.error("Form submission error:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const setFieldError = (fieldName, errorMessage) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldError,
    clearErrors,
    setFormData,
  };
};
