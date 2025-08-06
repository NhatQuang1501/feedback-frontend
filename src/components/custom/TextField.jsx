// CustomTextField.jsx
import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ className, InputProps, ...props }) => {
  return (
    <MuiTextField
      {...props}
      className={`bg-gray-50/50 ${className || ""}`}
      InputProps={{
        ...InputProps,
        className: `rounded-lg border border-gray-300 ${InputProps?.className || ""}`,
        sx: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffec99",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e6d486",
            borderWidth: "2px",
          },
          ...InputProps?.sx,
        },
      }}
    />
  );
};

export default TextField;
