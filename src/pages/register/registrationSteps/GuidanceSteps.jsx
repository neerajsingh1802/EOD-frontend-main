import { Card } from "@mui/material";
import React from "react";
import LineProgress from "../../../components/common/Progress/LineProgress";
import PersonalInfo from "./PersonaIlnfo";
import CommunicationDetails from "./CommunicationDetails";
import CompanyInfo from "./CompanyInfo";
import Button from "components/common/Button";

const guidance_steps = [
  "Personal Info",
  "Company Info",
  "Communication Details",
];

const GuidanceSteps = ({
  accountType,
  onChange,
  errors,
  formData,
  loading,
  current,
  handleBack,
  handleNext,
}) => {
  return (
    <Card sx={{ width: "500px", p: 3 }} className="mx-auto px-10">
      <div className="mt-4 flex-column items-center">
        <LineProgress
          curr={current}
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
        {current === 0 && <PersonalInfo formData={formData} />}
        {current === 1 && (
          <CompanyInfo formData={formData} accountType={accountType} />
        )}
        {current === 2 && <CommunicationDetails />}
      </div>
      <div className="flex justify-between">
        <Button onClick={handleBack}>Back</Button>
        <div className="flex gap-10">
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default GuidanceSteps;
