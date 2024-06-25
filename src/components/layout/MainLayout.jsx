import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import colorConfigs from "../../utils/configs/colorConfigs";
import sizeConfigs from "../../utils/configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { appState } = useSelector((state) => state.appState);

  return (
    <Box sx={{ display: "flex", background: "#F3F7FC" }} >
      {appState !== "login" && appState !== "register" && (
        <Box
          component="nav"
          sx={{
            width: sizeConfigs.sidebar.width,
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width:
            appState !== "login" && appState !== "register"
              ? `calc(100% - ${sizeConfigs.sidebar.width})`
              : "100%",
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
