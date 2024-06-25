import React from "react";
import SelectInput from "../../../components/common/Inputs/SelectInput";
import Input from "components/common/Inputs/Input";

const CompanyInfo = ({ formData, accountType, onChange, error }) => {
  return (
    <div className="flex-column gap-30">
      <Input
        sx={{ width: "100%" }}
        name="companyType"
        placeholder="Company Type"
        value={formData.companyType}
        required
        disabled={true}
        onChange={onChange}
      />
      <Input
        sx={{ width: "100%" }}
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        required
        onChange={onChange}
        error={error?.companyName}
        helperText={error?.companyName ? "This Field is required*" : ""}
      />
      <Input
        sx={{ width: "100%" }}
        name="about"
        placeholder="About"
        value={formData.about}
        required
        onChange={onChange}
        error={error?.about}
        helperText={error?.about ? "This Field is required*" : ""}
      />

      <Input
        sx={{ width: "100%" }}
        name="ownership"
        placeholder="Company Ownership"
        value={formData.ownership}
        required
        onChange={onChange}
        error={error?.ownership}
        helperText={error?.ownership ? "This Field is required*" : ""}
      />

      <div className="flex gap-20">
        <Input
          sx={{ width: "100%" }}
          name="numberOfEmployee"
          placeholder="Number Of Employees"
          value={formData.numberOfEmployee}
          required
          onChange={onChange}
          error={error?.numberOfEmployee}
          helperText={error?.numberOfEmployee ? "This Field is required*" : ""}
        />
        <SelectInput
          name="industry"
          label="Industry"
          onChange={onChange}
          value={formData?.industry}
          error={error?.industry}
          helperText={error?.industry ? "This field is required" : ""}
          options={["Industry 1", "Industry 2", "Industry 3"]}
          height="40px"
        />
      </div>
      {accountType === "COMPANY_PROVIDER" && (
        <>
          <Input
            name="caseStudy"
            placeholder="Company Ownership"
            variant="outlined"
            value={formData?.caseStudy}
            required
            onChange={onChange}
            error={error?.caseStudy}
            helperText={error?.caseStudy ? "Please enter Title" : ""}
          />
          <SelectInput
            name="cmmLevel"
            label="CMM Level"
            onChange={onChange}
            value={formData?.cmmLevel}
            error={formData?.cmmLevel}
            helperText={formData?.cmmLevel ? "This field is required" : ""}
            options={["Level 1", "Level 2", "Level 3"]}
            height={"40px"}
          />
        </>
      )}
    </div>
  );
};

export default CompanyInfo;
