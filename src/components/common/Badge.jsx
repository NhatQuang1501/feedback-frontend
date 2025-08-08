import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBadge = styled(Box)(({ variant, color }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.35rem 1rem",
  borderRadius: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: 500,
  lineHeight: "1.25rem",
  textTransform: "capitalize",
  transition: "all 0.2s ease-in-out",
  gap: "0.375rem",
  whiteSpace: "nowrap",
  paddingRight: "1rem",
  paddingLeft: "1rem",
  ...(variant === "default" && {
    backgroundColor: color || "#c7a84b",
    color: "#ffffff",
  }),
  ...(variant === "secondary" && {
    backgroundColor: color ? `${color}33` : "#ffec9933",
    color: color || "#713f12",
  }),
  ...(variant === "outline" && {
    backgroundColor: "transparent",
    border: `1px solid ${color || "#c7a84b"}`,
    color: color || "#c7a84b",
  }),
  ...(variant === "destructive" && {
    backgroundColor: "#fef2f2",
    border: "1px solid #b91c1c",
    color: "#b91c1c",
  }),
  "&:hover": {
    ...(variant === "default" && {
      filter: "brightness(1.1)",
    }),
    ...(variant === "secondary" && {
      backgroundColor: color ? `${color}66` : "#ffec9966",
    }),
    ...(variant === "outline" && {
      backgroundColor: color ? `${color}1a` : "#ffec991a",
    }),
    ...(variant === "destructive" && {
      backgroundColor: "#fee2e2",
    }),
  },
}));

const Badge = ({ children, variant = "default", color }) => {
  return (
    <StyledBadge variant={variant} color={color} className="select-none">
      {children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "secondary", "outline", "destructive"]),
  color: PropTypes.string,
};

export default Badge;
