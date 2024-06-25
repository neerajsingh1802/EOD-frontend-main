import { Grid, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const account_types = [
  { id: 1, title: "Seeker", icon: <AccountCircleIcon fontSize="large" /> },
  { id: 2, title: "Provider", icon: <AccountBalanceIcon fontSize="large" /> },
];

const AccountType = ({ onClick }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      className="mx-auto mt-10vh h-auto items-center justify-center"
      spacing={2}
    >
      {account_types.map(({ id, title, icon }) => (
        <Grid item xs={12} md={4} lg={3} key={id}>
          <Card
            className="text-center cursor-pointer column-center py-10 mx-2--mob"
            onClick={() => onClick(id)}
          >
            {icon}
            <h3 className="mt-6">{title}</h3>
          </Card>
        </Grid>
      ))}
      <p className="w-full text-center mt-10 mb-4 fs-18 fw-500">
        Already have an account?
        <span
          className="c-primary fw-600 cursor-pointer link ml-1"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </Grid>
  );
};

export default AccountType;
