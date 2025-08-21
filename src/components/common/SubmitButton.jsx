import React from "react";
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({
  children,
  loading = false,
  disabled = false,
  variant = "contained",
  size = "large",
  fullWidth = true,
  type = "submit",
  onClick,
  className = "",
  ...props
}) => {
  // Style giống feedback form
  const buttonClasses =
    variant === "contained"
      ? `h-[52px] w-full min-w-0 rounded-xl bg-[#ffec99] text-base font-semibold text-[#333333] normal-case shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-[#e6d486] hover:shadow-xl active:-translate-y-0.5 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none ${className}`
      : `h-[52px] w-full min-w-0 rounded-xl border-2 border-[#e6d486] bg-white text-base font-medium text-[#333333] normal-case shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[#ffec99] hover:bg-[#fffef7] hover:shadow-lg active:translate-y-0 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-300 ${className}`;

  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      disabled={loading || disabled}
      onClick={onClick}
      className={buttonClasses}
      sx={{
        textTransform: "none",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        ...props.sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default SubmitButton;
