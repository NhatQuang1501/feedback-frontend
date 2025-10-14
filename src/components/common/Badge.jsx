import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const Badge = ({ children, variant = "default", color, style, ...props }) => {
  const getVariantStyles = () => {
    const baseStyles = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1px 7px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "20px",
      textTransform: "capitalize",
      transition: "all 0.2s ease-in-out",
      gap: "6px",
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      minHeight: "auto",
    };

    switch (variant) {
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: color ? `${color}33` : "#ffec9933",
          color: color || "#713f12",
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          border: `1px solid ${color || "#c7a84b"}`,
          color: color || "#c7a84b",
          padding: "5px 15px",
        };
      case "destructive":
        return {
          ...baseStyles,
          backgroundColor: "#fef2f2",
          border: "1px solid #b91c1c",
          color: "#b91c1c",
          padding: "5px 15px",
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: color || "#c7a84b",
          color: "#ffffff",
        };
    }
  };

  const badgeStyles = {
    ...getVariantStyles(),
    ...style,
  };

  return (
    <Box className="custom-badge select-none" style={badgeStyles} {...props}>
      {children}
    </Box>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "secondary", "outline", "destructive"]),
  color: PropTypes.string,
  style: PropTypes.object,
};

export default Badge;
