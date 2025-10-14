import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, CircularProgress } from "@mui/material";

const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  children,
  ...rest
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-amber-400 text-white hover:bg-amber-500 active:bg-amber-600 shadow-md hover:shadow-lg";
      case "secondary":
        return "bg-gray-800 text-white hover:bg-gray-900 active:bg-black shadow-md hover:shadow-lg";
      case "outlined":
        return "border-amber-500 bg-white text-amber-400 hover:border-amber-700 hover:bg-amber-50 active:bg-amber-100";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg";
      case "success":
        return "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg";
      case "text":
        return "bg-transparent text-amber-600 hover:bg-amber-50 active:bg-amber-100";
      default:
        return "bg-amber-400 text-white hover:bg-amber-500 active:bg-amber-600 shadow-md hover:shadow-lg";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-9 px-4 text-sm rounded-lg";
      case "medium":
        return "h-11 px-5 text-base rounded-xl";
      case "large":
        return "h-[52px] px-6 text-base font-semibold rounded-xl";
      default:
        return "h-11 px-5 text-base rounded-xl";
    }
  };

  const getDisabledClasses = () => {
    if (variant === "outlined") {
      return "border-gray-300 bg-gray-100 text-gray-400 shadow-none";
    }
    return "bg-gray-100 text-gray-400 shadow-none";
  };

  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? getDisabledClasses() : ""}
    transition-all duration-200 ease-in-out
    font-medium normal-case
    flex items-center justify-center
    ${className}
  `;

  const renderStartIcon = () => {
    if (loading) {
      return (
        <CircularProgress size={size === "small" ? 16 : 20} color="inherit" className="mr-2" />
      );
    }
    return startIcon && <span className="mr-2">{startIcon}</span>;
  };

  return (
    <MuiButton
      variant={variant === "outlined" ? "outlined" : "contained"}
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      disableElevation
      startIcon={renderStartIcon()}
      endIcon={endIcon && <span className="ml-2">{endIcon}</span>}
      {...rest}
    >
      {loading ? "Đang xử lý..." : children}
    </MuiButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outlined", "text", "danger", "success"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
