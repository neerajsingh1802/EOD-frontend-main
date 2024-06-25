import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import "./input.scss";

const MultiSelect = ({
  label,
  name,
  disabled,
  options,
  value,
  onChange,
  error,
  helperText,
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
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) =>
          !!selected.length ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    height: "30px",
                    borderRadius: "8px",
                    background: "#0F248F33",
                    color: "#0F248F",
                  }}
                />
              ))}
            </Box>
          ) : (
            label
          )
        }
      >
        {options.length &&
          options?.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelect;
