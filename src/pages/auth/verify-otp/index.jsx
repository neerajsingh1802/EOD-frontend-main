import { Card, Typography } from "@mui/material";
import Button from "components/common/Button";
import React, { useEffect, useState } from "react";
import useAuth from "store-redux/auth/service-hook";
import { useSearchParams } from "react-router-dom";
import Input from "components/common/Inputs/Input";

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const { verifyOtp, resetPassword, createPassword, state } = useAuth();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState();
  const [isResetPassword, setResetPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [resetPassData, setResetPassData] = useState({});

  useEffect(() => {
    const paramEmail = searchParams.get("email");
    const paramResetPassword = searchParams.get("reset-password");
    if (paramResetPassword) setResetPassword(true);
    setEmail(paramEmail);
  }, []);

  const handleResetPassChange = (e) => {
    const { name, value } = e.target;
    setResetPassData({ ...resetPassData, [name]: value });
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    if (isResetPassword) {
      step === 1 ? setStep(2) : await resetPassword(otp, email, resetPassData);
    } else {
      step === 1
        ? await verifyOtp(otp, email)
        : await createPassword(
            email,
            state?.accountCreation?.firstName +
              " " +
              state?.accountCreation?.lastName,
            resetPassData.password
          );
      setStep(2);
    }
    setLoading(false);
  };

  // const disabledSubmit = () => {
  //   return Boolean(step === 1 ? !otp || otp.length < 6 : isResetPassword);
  // };
  return (
    <div className="flex items-center justify-center py-10">
      <Card sx={{ p: 3, maxWidth: "450px" }} className="py-10 rounded-10">
        <div className="w-90p">
          <Typography className="text-center fw-700 fs-32 pb-5 c-primary">
            {step === 1
              ? "Enter Verification Code"
              : isResetPassword
              ? "Reset Password"
              : "Create Password"}
          </Typography>
          {step === 1 && (
            <p className="text-center fs-18 ">
              We have sent an Otp to this email. <strong>{email}</strong>
            </p>
          )}
        </div>
        <div className="w-80p mx-auto mt-8 mb-15">
          {step === 1 ? (
            <Input
              placeholder="Otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              height="50px"
            />
          ) : (
            <div className="">
              <Input
                placeholder="Password"
                name="password"
                value={resetPassData.password}
                onChange={handleResetPassChange}
                height="50px"
                classes=" mb-5"
              />
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                value={resetPassData.confirmPassword}
                onChange={handleResetPassChange}
                height="50px"
                type="password"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between w-90p mt-10">
          <Button>Back</Button>
          <Button
            // disabled={disabledSubmit}
            loading={loading}
            onClick={handleVerifyOtp}
          >
            {step === 1 ? "Submit" : isResetPassword ? "Reset" : "Create"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyOtp;
