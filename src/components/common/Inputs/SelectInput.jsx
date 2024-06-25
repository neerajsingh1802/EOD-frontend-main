import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import "./input.scss";
import OutlinedInput from "@mui/material/OutlinedInput";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultValue,
  value,
  options,
  disabled,
  error,
  helperText,
  icon,
  height,
  width,
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={error}
      sx={{ width: !!width ? width : "100%" }}
      hiddenLabel
    >
      <Select
        sx={{
          height: !!height ? height : "45px",
          width: !!width ? width : "100%",
        }}
        displayEmpty
        className="select"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name={name}
        value={value}
        defaultValue={defaultValue}
        renderValue={(value) => (value && value !== "" ? value : label)}
        disabled={disabled}
        onChange={onChange}
        input={<OutlinedInput />}
        inputProps={
          icon && {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }
        }
      >
        {options.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
