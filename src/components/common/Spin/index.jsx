import { CircularProgress } from "@mui/material";
import React from "react";

const Spin = () => {
  return (
    <CircularProgress
      data-testid="spinner"
      style={{ color: "#eee" }}
      size={20}
    />
  );
};

export default Spin;
