import React from "react";
import { Button } from "@mui/material";

// ==================== SOCIAL BUTTON COMPONENT ====================
const SocialButton = ({
  children,
  icon,
  onClick,
  disabled = false,
  fullWidth = true,
  variant = "outlined",
  size = "large",
  className = "",
  ...props
}) => {
  // Style giống feedback form - outlined button
  const buttonClasses = `h-[52px] w-full min-w-0 rounded-xl border-2 border-[#e6d486] bg-white text-base font-medium text-[#333333] normal-case shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[#ffec99] hover:bg-[#fffef7] hover:shadow-lg active:translate-y-0 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-300 ${className}`;

  // ==================== RENDER ====================
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      startIcon={<div className="text-xl">{icon}</div>}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      sx={{
        "textTransform": "none",
        "fontFamily": '"Roboto", "Helvetica", "Arial", sans-serif',
        "& .MuiButton-startIcon": {
          "marginRight": "8px",
          "& > *:nth-of-type(1)": {
            fontSize: "1.2rem",
          },
        },
        ...props.sx,
      }}
      {...props}
    >
      <span className="font-medium text-[#333333]">{children}</span>
    </Button>
  );
};

export default SocialButton;
