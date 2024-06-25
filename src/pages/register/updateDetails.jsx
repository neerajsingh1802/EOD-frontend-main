import React, { useState } from "react";
import useAuth from "store-redux/auth/service-hook";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Button from "components/common/Button";
import LineProgress from "components/common/Progress/LineProgress";
import CommunicationDetails from "./registrationSteps/CommunicationDetails";
import CompanyInfo from "./registrationSteps/CompanyInfo";
import PersonalInfo from "./registrationSteps/PersonaIlnfo";
import { REQUIRED_VALIDATOR, Validate } from "helpers/utils/validator";

const guidance_steps = [
  "Personal Info",
  "Company Info",
  "Communication Details",
];

const UpdateDetails = () => {
  const { state, updateUser, updateCompany } = useAuth();
  const navigate = useNavigate();
  const [registerStep, setRegisterStep] = useState(0);
  const [userRegistrationData, setUserRegistrationData] = useState({
    firstName: state?.accountCreation?.firstName ?? "",
    lastName: state?.accountCreation?.lastName ?? "",
    email: state?.accountCreation?.email ?? "",
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [companyDetails, setCompanyDetails] = useState({
    companyType: state.accountType,
  });
  const [companyError, setCompanyError] = useState({});
  const [loading, setLoading] = useState(false);

  const onUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserRegistrationData({ ...userRegistrationData, [name]: value });
  };

  const onCompanyDetailsChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleBack = () => {
    if (registerStep > 0) {
      setRegisterStep((val) => val - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNext = async () => {
    if (registerStep === 0) {
      const { designation, gender, mob, linkedin } = userRegistrationData;
      const designationErr = Validate(REQUIRED_VALIDATOR, designation);
      const genderErr = Validate(REQUIRED_VALIDATOR, gender);
      const mobErr = Validate(REQUIRED_VALIDATOR, mob);
      const linkedinErr = Validate(REQUIRED_VALIDATOR, linkedin);
      if (designationErr || genderErr || mobErr || linkedinErr) {
        const error = {
          designation: designationErr,
          gender: genderErr,
          mob: mobErr,
          linkedin: linkedinErr,
        };
        setRegisterErrors(error);
      } else {
        setRegisterErrors({});
        setLoading(true);
        await updateUser(userRegistrationData, state?.loggedInUser);
        setLoading(false);
        setRegisterStep(registerStep + 1);
      }
    }
    if (registerStep === 1) {
      const { companyName, about, ownership, numberOfEmployee, industry } =
        companyDetails;
      const companyNameErr = Validate(REQUIRED_VALIDATOR, companyName);
      const companyOwnershipErr = Validate(REQUIRED_VALIDATOR, ownership);
      const aboutERR = Validate(REQUIRED_VALIDATOR, about);
      const numberOfEmployeeErr = Validate(
        REQUIRED_VALIDATOR,
        numberOfEmployee
      );
      const industryErr = Validate(REQUIRED_VALIDATOR, industry);
      if (
        companyNameErr ||
        companyOwnershipErr ||
        aboutERR ||
        numberOfEmployeeErr ||
        industryErr
      ) {
        const err = {
          companyName: companyNameErr,
          about: aboutERR,
          ownership: companyOwnershipErr,
          numberOfEmployee: numberOfEmployeeErr,
          industry: industryErr,
        };
        setCompanyError(err);
      } else {
        setCompanyError({});
        setRegisterStep(registerStep + 1);
      }
    }
    if (registerStep === 2) {
      const { address, country, state, city, pincode, phone1 } = companyDetails;
      const addressErr = Validate(REQUIRED_VALIDATOR, address);
      const countryErr = Validate(REQUIRED_VALIDATOR, country);
      const stateErr = Validate(REQUIRED_VALIDATOR, state);
      const cityErr = Validate(REQUIRED_VALIDATOR, city);
      const pincodeErr = Validate(REQUIRED_VALIDATOR, pincode);
      const phoneErr = Validate(REQUIRED_VALIDATOR, phone1);

      if (
        addressErr ||
        countryErr ||
        stateErr ||
        cityErr ||
        pincodeErr ||
        phoneErr
      ) {
        console.log("hai error")
        const err = {
          address: addressErr,
          country: countryErr,
          state: stateErr,
          city: cityErr,
          pincode: pincodeErr,
          phone1: phoneErr,
        };
        setCompanyError(err);
      } else {
        console.log("running")
        setCompanyError({});
        setLoading(true);
        await updateCompany(companyDetails);
        setLoading(false);
      }
    }
  };
console.log({companyError})
  return (
    <Card
      sx={{ width: "500px", p: 3, borderRadius: "20px" }}
      className="mx-auto px-10 my-14"
    >
      <div className="mt-4 flex-column items-center">
        <LineProgress
          curr={registerStep}
          length={guidance_steps.length}
          numbered
          rounded
        />
        <div className="flex mt-1 mx-auto">
          {guidance_steps.map((title) => (
            <p className="fs-12 opacity-70 w-80 mx-3 text-center" key={title}>
              {title}
            </p>
          ))}
        </div>
      </div>
      <div className="py-5">
        {registerStep === 0 && (
          <PersonalInfo
            formData={userRegistrationData}
            onChange={onUserDetailsChange}
            error={registerErrors}
          />
        )}
        {registerStep === 1 && (
          <CompanyInfo
            formData={companyDetails}
            accountType={state.accountType}
            onChange={onCompanyDetailsChange}
          />
        )}
        {registerStep === 2 && (
          <CommunicationDetails
            formData={companyDetails}
            onChange={onCompanyDetailsChange}
            error={companyError}
          />
        )}
      </div>
      <div className="flex justify-between my-3">
        {registerStep === 2 && <Button onClick={handleBack}>Back</Button>}
        <div className="flex gap-10 ">
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default UpdateDetails;
