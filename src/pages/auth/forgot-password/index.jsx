import Button from "components/common/Button";
import Input from "components/common/Inputs/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "store-redux/auth/service-hook";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);

  const handleReset = async () => {
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
  };
  return (
    <div className="auth-card my-20">
      <h2 className="mt-4  text-center">Forgot Password</h2>

      <p className="px-8 mt-2 mb-10 fs-14 text-center">
        Enter the email address you use on Preprlabs. We'll send you a OTP to
        reset your password.
      </p>
      <div className="w-70p mx-auto  mt-10">
        <Input
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          height="60px"
        />
      </div>
      <div className={`nextback__buttons mt-10`}>
        <Button
          bordered
          height="40px"
          onClick={() => navigate(-1)}
          width="120px"
          variant="outlined"
        >
          Back
        </Button>
        <Button
          height="40px"
          width="120px"
          onClick={handleReset}
          loading={loading}
          classes="px-2"
          variant="outlined"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
