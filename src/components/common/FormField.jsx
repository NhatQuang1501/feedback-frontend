import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ==================== FORM FIELD COMPONENT ====================
const FormField = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  helperText,
  placeholder,
  startIcon,
  showPassword,
  onTogglePassword,
  disabled = false,
  fullWidth = true,
  autoFocus = false,
  className = "",
  ...props
}) => {
  // Chỉ hiển thị placeholder khi không có value và label đã shrink
  const shouldShowPlaceholder = !value && placeholder;

  // ==================== RENDER ====================
  return (
    <div className={`w-full ${className}`}>
      <TextField
        fullWidth={fullWidth}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error || helperText}
        placeholder={shouldShowPlaceholder ? placeholder : ""}
        disabled={disabled}
        autoFocus={autoFocus}
        variant="outlined"
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              <div className="flex items-center pr-2 pl-3 text-gray-500">{startIcon}</div>
            </InputAdornment>
          ),
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                edge="end"
                size="small"
                disabled={disabled}
                className="mr-3 text-gray-500 transition-colors duration-200 hover:text-gray-700 disabled:text-gray-300"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          className:
            "rounded-lg border border-gray-300 hover:border-primary-main focus:border-primary-dark",
        }}
        InputLabelProps={{
          shrink: true,
        }}
        className="w-full bg-gray-50/50 [&_.MuiOutlinedInput-root]:h-14 [&_.MuiOutlinedInput-root]:text-base"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& .MuiInputAdornment-root": {
              height: "100%",
              maxHeight: "none",
            },
            "& .MuiInputAdornment-positionStart": {
              marginLeft: "8px", // Tăng khoảng cách từ viền trái
            },
            "& .MuiInputAdornment-positionEnd": {
              marginRight: "8px", // Tăng khoảng cách từ viền phải
            },
          },
          "& .MuiInputBase-input": {
            "paddingLeft": startIcon ? "8px" : "16px", // Padding cho text input
            "paddingRight": type === "password" ? "8px" : "16px",
            "fontSize": "1rem",
            "lineHeight": "1.5",
            "&::placeholder": {
              color: "#9ca3af",
              opacity: 1,
              fontSize: "0.95rem",
            },
          },
          "& .MuiFormLabel-root": {
            "fontSize": "0.875rem",
            "fontWeight": 500,
            "backgroundColor": "white",
            "padding": "0 4px",
            "color": "#374151",
            // Điều chỉnh vị trí label để không overlap với icon
            "transform": startIcon
              ? "translate(60px, -9px) scale(1)"
              : "translate(16px, -9px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: startIcon
                ? "translate(60px, -9px) scale(1)"
                : "translate(16px, -9px) scale(1)",
            },
            "&.Mui-focused": {
              color: "#e6d486",
            },
            "&.Mui-error": {
              color: "#ef4444",
            },
          },
          "& .MuiFormHelperText-root": {
            "fontSize": "0.75rem",
            "marginTop": "6px",
            "marginLeft": "16px",
            "color": "#6b7280",
            "&.Mui-error": {
              color: "#ef4444",
            },
          },
        }}
        {...props}
      />
    </div>
  );
};

export default FormField;
