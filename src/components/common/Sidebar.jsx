import {
  Typography,
  Drawer,
  List,
  Toolbar,
  Card,
  Divider,
  Popover,
} from "@mui/material";
import colorConfigs from "../../utils/configs/colorConfigs";
import sizeConfigs from "../../utils/configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import logo from "../../assets/images/logo.jpg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import useAuth from "store-redux/auth/service-hook";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { state, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          display: "flex",
          direction: "column",
          justifyContent: "space-between",
          width: sizeConfigs.sidebar.width,
          fontWeight: 700,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <List disablePadding>
        <Toolbar
          sx={{
            background: "#f5f5f5",
            padding: "0px !important",
          }}
        >
          <img src={logo} alt="/logo" className="w-full h-90" />
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>

      <Card
        className="w-80p mb-5 mx-auto p-3 flex justify-between items-center"
        sx={{ border: "1px solid #0C239B33", borderRadius: "8px" }}
        onClick={handleOpenModal}
      >
        <AccountCircleIcon />
        <div>
          <Typography sx={{ fontSize: "12px" }}>
            {" "}
            {state.loggedInUser?.user.name}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            {state.loggedInUser?.user.email}
          </Typography>
        </div>
        <KeyboardArrowRightIcon />
      </Card>
      {/* {isModalOpen && (
        <div
          className=""
          style={{
            width: "120px",
            position: "absolute",
            bottom: "100px",
            right: 0,
            border: "1px solid gray",
            padding: 8,
            borderRadius: "8px",
          }}
        >
          <p>Profile</p>
          <Divider />
          <p>Logout</p>
        </div>
      )} */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          sx={{
            px: 2,
            py: 1,
            fontSize: 14,
            cursor: "pointer",
            "&: hover": {
              background: "#0F248F1A",
            },
          }}
        >
          {" "}
          Profile
        </Typography>
        <Typography
          sx={{
            px: 2,
            py: 1,
            fontSize: 14,
            cursor: "pointer",
            "&: hover": {
              background: "#0F248F1A",
            },
          }}
          onClick={logout}
        >
          Logout
        </Typography>
      </Popover>
    </Drawer>
  );
};

export default Sidebar;
