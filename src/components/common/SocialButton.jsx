import React from 'react';
import {
  Button,
} from '@mui/material';

// ==================== SOCIAL BUTTON COMPONENT ====================
const SocialButton = ({
  children,
  icon,
  onClick,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'large',
  ...props
}) => {
  // ==================== RENDER ====================
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={{
        height: 52,
        borderRadius: 2,
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        color: 'text.primary',
        borderColor: 'divider',
        borderWidth: 1.5,
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          borderWidth: 1.5,
          transform: 'translateY(-1px)',
          boxShadow: 2,
        },
        '&:disabled': {
          backgroundColor: 'action.disabledBackground',
          borderColor: 'action.disabled',
        },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SocialButton;