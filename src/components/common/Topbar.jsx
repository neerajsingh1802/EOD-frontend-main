import { Typography } from "@mui/material";
import colorConfigs from "../../utils/configs/colorConfigs";
import { Box } from "@mui/material";

const Topbar = ({ title, children }) => {
  return (
    <Box
      sx={{
        width: "99%",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        p: "24px 16px",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "20px" }} variant="h6">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default Topbar;
