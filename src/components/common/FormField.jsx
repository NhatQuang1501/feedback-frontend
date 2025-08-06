import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// ==================== FORM FIELD COMPONENT ====================
const FormField = ({
  name,
  label,
  type = 'text',
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
  ...props
}) => {
  // ==================== RENDER ====================
  return (
    <TextField
      fullWidth={fullWidth}
      name={name}
      type={type === 'password' && showPassword ? 'text' : type}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              onClick={onTogglePassword}
              edge="end"
              size="small"
              sx={{ mr: 0.5 }}
              disabled={disabled}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          height: 56,
          '& .MuiInputAdornment-root': {
            marginLeft: 0,
          },
        },
        '& .MuiInputBase-input': {
          paddingLeft: startIcon ? 1 : undefined,
          fontSize: '1rem',
        },
        '& .MuiFormLabel-root': {
          fontSize: '1rem',
        },
      }}
      {...props}
    />
  );
};

export default FormField;