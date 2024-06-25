import React, { useState } from "react";
import AccountType from "./registrationSteps/AccountType";
import GuidanceSteps from "./registrationSteps/GuidanceSteps";
import { Card, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  EMAIL_VALIDATOR,
  REQUIRED_VALIDATOR,
  Validate,
} from "../../helpers/utils/validator";
import logo from "../../assets/images/logo.jpg";
import Button from "components/common/Button";
import useAuth from "store-redux/auth/service-hook";

const Register = () => {
  const { register, accountTypeSelection } = useAuth();
  const [step, setStep] = useState(0);
  const [registerData, setRegisterData] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onClickAccountType = async (id) => {
    const value = id === 1 ? "COMPANY_SEEKER" : "COMPANY_PROVIDER";
    await accountTypeSelection(value);
    setStep(1);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email } = registerData;
    const firstNameErr = Validate(REQUIRED_VALIDATOR, firstName);
    const lastNameErr = Validate(REQUIRED_VALIDATOR, lastName);
    const emailErr = Validate(EMAIL_VALIDATOR, email);

    if (firstNameErr || lastNameErr || emailErr) {
      const error = {
        firstName: firstNameErr,
        lastName: lastNameErr,
        email: emailErr,
      };
      toast.error("Please fill all fields.");
      setRegisterErrors({ ...error });
    } else {
      setLoading();
      await register(registerData);
      setLoading();
    }
  };

  return (
    <div className="flex-center justify-center py-10 ">
      {step === 0 && <AccountType onClick={onClickAccountType} />}
      {step === 1 && (
        <Card
          sx={{ p: "0px 32px 32px 32px", width: "400px" }}
          className="flex-column justify-center items-center rounded-10"
        >
          <img src={logo} alt={"/logo"} className="w-250 h-140 mx-auto" />
          <Typography className="text-center fw-700 fs-24 pb-8 c-primary">
            Sign Up
          </Typography>
          <div className="flex-column w-90p gap-30 justify-center items-center">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={registerData?.firstName}
              required
              onChange={onChange}
              error={registerErrors?.firstName}
              helperText={
                registerErrors?.firstName ? "Please enter First Name" : ""
              }
            />
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={registerData?.lastName}
              required
              onChange={onChange}
              error={registerErrors?.lastName}
              helperText={
                registerErrors?.lastName ? "Please enter last name" : ""
              }
            />
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              value={registerData?.email}
              required
              onChange={onChange}
              error={registerErrors?.email}
              helperText={
                registerErrors?.email ? "Please enter a valid email" : ""
              }
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </Card>
      )}
      {/* {step === 3 && (
        <GuidanceSteps
          accountType={accountType}
          onChange={onChange}
          errors={registerErrors}
          formData={registerData}
          handleBack={handleBack}
          handleNext={handleNext}
          loading={loading}
          current={registerStep}
        />
      )} */}
    </div>
  );
};

export default Register;
