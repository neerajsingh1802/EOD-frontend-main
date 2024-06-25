import Dashboard from "../pages/dashboard";
import HomePage from "../pages/home";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Reports from "../pages/reports";
import CreateProposals from "../pages/proposals/create-proposals";
import ViewProposals from "../pages/proposals/view-proposals";
import Proposals from "../pages/proposals";
import Inbox from "../pages/inbox";
import Media from "../pages/media";
import Calendar from "../pages/calendar";
import Visitors from "../pages/visitors";
import Settings from "../pages/settings";
import ProposalsPageLayout from "../pages/proposals/proposalsPageLayout";
import Login from "../pages/login";
import Register from "../pages/register/register";
import ForgotPassword from "../pages/auth/forgot-password";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import VerifyOtp from "pages/auth/verify-otp";
import UpdateDetails from "pages/register/updateDetails";

const appRoutes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    index: true,
    path: "/login",
    element: <Login />,
    state: "login",
  },
  {
    path: "/register",
    element: <Register />,
    state: "register",
  },
  {
    path: "/register/fill-details",
    element: <UpdateDetails />,
    state: "register",
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    state: "register",
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
    state: "register",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
  },
  {
    path: "/bidding",
    element: <Reports />,
    state: "bidding",
    sidebarProps: {
      displayText: "Bidding",
      icon: <AssessmentOutlinedIcon />,
    },
  },
  {
    path: "/proposals",
    element: <ProposalsPageLayout />,
    state: "proposals",
    sidebarProps: {
      displayText: "Proposal",
      icon: <DescriptionOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <Proposals />,
        state: "proposals.index",
      },
      {
        path: "/proposals/create",
        element: <CreateProposals />,
        state: "proposals.create",
        sidebarProps: {
          displayText: "Create Proposals",
        },
      },
      {
        path: "/proposals/view",
        element: <ViewProposals />,
        state: "proposals.view",
        sidebarProps: {
          displayText: "View Proposals",
        },
      },
    ],
  },
  {
    path: "/favourite-partners",
    element: <Inbox />,
    state: "favourite-partners",
    sidebarProps: {
      displayText: "Favourite Partners",
      icon: <VolunteerActivismOutlinedIcon />,
    },
  },
  {
    path: "/contract-view",
    element: <Media />,
    state: "contract-view",
    sidebarProps: {
      displayText: "Contract View",
      icon: <AssignmentOutlinedIcon />,
    },
  },
  {
    path: "/payment-plan",
    element: <Calendar />,
    state: "payment-plan",
    sidebarProps: {
      displayText: "Payment Plan",
      icon: <AccountBalanceOutlinedIcon />,
    },
  },
  {
    path: "/payment",
    element: <Visitors />,
    state: "payment",
    sidebarProps: {
      displayText: "Payment and Invoice",
      icon: <ReceiptIcon />,
    },
  },
  {
    path: "/user-management",
    element: <Settings />,
    state: "user-management",
    sidebarProps: {
      displayText: "User Management",
      icon: <SupervisorAccountOutlinedIcon />,
    },
  },
  {
    path: "/notifications",
    element: <Settings />,
    state: "notifications",
    sidebarProps: {
      displayText: "Notifications",
      icon: <NotificationsNoneIcon />,
    },
  },
  {
    path: "/settings",
    element: <Settings />,
    state: "settings",
    sidebarProps: {
      displayText: "Settings",
      icon: <SettingsOutlinedIcon />,
    },
  },
];

export default appRoutes;
