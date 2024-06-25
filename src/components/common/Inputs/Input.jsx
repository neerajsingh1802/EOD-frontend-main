import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import "./input.scss";

const Input = ({
  type,
  name,
  placeholder,
  variant,
  value,
  onChange,
  required = false,
  error,
  helperText = "",
  disabled = false,
  icon,
  width,
  height,
  fontSize,
  classes,
}) => {
  return (
    <TextField
      sx={{
        width: width,

        "& .MuiInputBase-root": {
          height: !!height ? height : "40px",
          borderRadius: "8px",
          fontSize: !!fontSize ? fontSize : "14px",
        },
      }}
      type={type}
      className={`input ${classes}`}
      name={name}
      placeholder={placeholder}
      variant={variant}
      value={value}
      required={required}
      disabled={disabled}
      onChange={onChange}
      error={error}
      InputProps={
        icon && {
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }
      }
      helperText={helperText}
    />
  );
};

export default Input;
