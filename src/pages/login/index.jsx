import React, { useState } from "react";
import { Card, TextField } from "@mui/material";
import Slider from "../../components/Slider";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import Button from "components/common/Button";
import {
  EMAIL_VALIDATOR,
  PASSWORD_VALIDATOR,
  Validate,
} from "helpers/utils/validator";
import useAuth from "store-redux/auth/service-hook";

const slides = [
  {
    title: "Slide #1",
    description: "Solve real-world problems through challenge-based learning.",
  },
  {
    title: "Slide #2",
    description:
      "Real world employers can view your profile and track your projects.",
  },
  {
    title: "Slide #3",
    description:
      "Join existing teams and match with new teammates to collaborate on projects together.",
  },
  {
    title: "Slide #4",
    description:
      "Earn microcredentials and achievements to verify your abilities.",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const navigateForgetPassword = () => navigate("/forgot-password");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginHandler = async () => {
    setLoading(true);
    const { email, password } = loginData;
    const emailErr = Validate(EMAIL_VALIDATOR, email);
    // const passwordErr = Validate(PASSWORD_VALIDATOR, password);

    if (emailErr) {
      const errorField = {
        email: emailErr,
        // password: passwordErr,
      };
      setError(errorField);
    } else {
      const body = { username: email, password };
      await login(body);
    }
    setLoading(false);
  };
  return (
    <div className="auth">
      <div className="auth-innerContainer">
        <Slider slides={slides} classes="slider-class" />
        <Card
          sx={{ width: "30%", p: "0px 32px 32px 32px" }}
          className="auth-card"
        >
          <img src={logo} alt={"/logo"} className="w-250 h-140" />
          <h1 className="mb-4 fs-32 fw-700 c-primary">Login</h1>
          <div className="w-80p flex-column items-center my-3">
            <TextField
              sx={{ width: "100%", mb: 3 }}
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              value={loginData?.email}
              required
              onChange={handleChange}
              error={error.email}
              helperText={error.email ? "Please fill Valid email" : ""}
            />
            <TextField
              sx={{ width: "100%", mb: 1 }}
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              value={loginData?.password}
              required
              onChange={handleChange}
              // error={error.password}
              // helperText={
              //   !!error.password ? "Please fill a valid Password!" : ""
              // }
            />
            <p
              className="link w-full mt-1 fs-14 text-right c-primary"
              onClick={navigateForgetPassword}
            >
              Forgot Password?
            </p>
            <Button onClick={loginHandler}>Login</Button>
            <div className="text-center mt-4 mb-4 flex fw-500 fs-14">
              <p className="m-0">Don't have account?</p>
              <p
                className="link ml-1--noMob c-primary"
                onClick={() => navigate("/register")}
              >
                Register
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
