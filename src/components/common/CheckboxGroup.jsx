import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const CheckboxGroup = ({
  title,
  options,
  selectedValues,
  onChange,
  field,
  color = "primary",
  className = "",
}) => {
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "yellow":
        return "text-yellow-600";
      case "purple":
        return "text-purple-600";
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  const handleChange = (value) => {
    onChange(field, value);
  };

  return (
    <FormControl component="fieldset" fullWidth className={className}>
      <FormLabel component="legend" className="mb-2 font-bold text-gray-700">
        {title}
      </FormLabel>
      <FormGroup className="space-y-1 sm:space-y-2 md:space-y-3">
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onChange={() => handleChange(option.value)}
                className={getColorClass()}
              />
            }
            label={option.label}
            className="gap-x-1 text-gray-800"
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

CheckboxGroup.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "blue", "yellow", "purple", "green", "red"]),
  className: PropTypes.string,
};

export default CheckboxGroup;
