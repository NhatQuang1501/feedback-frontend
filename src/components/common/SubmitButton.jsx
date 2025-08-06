import React from 'react';
import {
  Button,
  CircularProgress,
} from '@mui/material';

// ==================== SUBMIT BUTTON COMPONENT ====================
const SubmitButton = ({
  children,
  loading = false,
  disabled = false,
  variant = 'contained',
  size = 'large',
  fullWidth = true,
  type = 'submit',
  onClick,
  ...props
}) => {
  // ==================== RENDER ====================
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      disabled={loading || disabled}
      onClick={onClick}
      sx={{
        height: 52,
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: variant === 'contained' ? 2 : undefined,
        '&:hover': {
          boxShadow: variant === 'contained' ? 4 : 2,
          transform: 'translateY(-1px)',
        },
        '&:disabled': {
          backgroundColor: 'action.disabledBackground',
        },
        ...props.sx,
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;