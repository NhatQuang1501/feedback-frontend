import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material";

/**
 * @param {Object} props - Props của component
 * @param {string} props.label - Nhãn hiển thị trên Select
 * @param {string} props.value - Giá trị hiện tại của Select
 * @param {Function} props.onChange - Hàm xử lý khi giá trị thay đổi
 * @param {Array} props.options - Mảng các tùy chọn [{value, label}]
 * @param {string} props.placeholder - Placeholder khi không có giá trị nào được chọn
 * @param {string} props.error - Thông báo lỗi (nếu có)
 * @param {string} props.helperText - Văn bản trợ giúp hiển thị dưới Select
 * @param {Object} props.MenuProps - Props tùy chỉnh cho Menu
 * @param {string} props.size - Kích thước của Select: 'small', 'medium', 'large'
 * @param {Object} props.selectProps - Các props khác cho component Select
 * @param {string} props.className - Class tùy chỉnh cho FormControl
 * @param {string} props.selectClassName - Class tùy chỉnh cho Select
 */
const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Chọn...",
  error,
  helperText,
  MenuProps = { disableScrollLock: true },
  size = "medium",
  selectProps = {},
  className = "",
  selectClassName = "",
}) => {
  const getHeight = () => {
    switch (size) {
      case "small":
        return "h-10";
      case "large":
        return "h-14";
      default:
        return "h-12";
    }
  };

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <Typography variant="subtitle2" className="mb-1 font-medium text-gray-700">
          {label}
        </Typography>
      )}
      <FormControl fullWidth error={!!error} className={`bg-gray-50/50 ${className}`}>
        <MuiSelect
          value={value}
          onChange={handleChange}
          displayEmpty
          native={false}
          className={`hover:border-amber-600 focus:border-amber-600 ${getHeight()} rounded-lg border border-gray-300 text-base [&_.MuiSelect-nativeInput]:hidden [&_.MuiSelect-select]:flex [&_.MuiSelect-select]:items-center [&_.MuiSelect-select]:px-[14px] [&_.MuiSelect-select]:py-2 ${selectClassName}`}
          renderValue={(selected) => {
            if (!selected && selected !== 0) {
              return <span className="text-gray-400">{placeholder}</span>;
            }
            const option = options.find((opt) => opt.value === selected);
            return option ? option.label : selected;
          }}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 300 },
              className: "rounded-md shadow-lg border border-gray-100 bg-white",
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            ...MenuProps,
          }}
          {...selectProps}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <MenuItem
                key={option.value}
                value={option.value}
                disableRipple
                className={`rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                  isSelected
                    ? "bg-amber-100 font-medium text-amber-800"
                    : "text-gray-800 hover:bg-amber-50"
                }`}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </MuiSelect>
        {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  MenuProps: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  selectProps: PropTypes.object,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
};

export default CustomSelect;
