import { TextField } from "@mui/material";
import Input from "components/common/Inputs/Input";
import SelectInput from "components/common/Inputs/SelectInput";
import { COUNTRY_STATE_LIST } from "pages/proposals/create-proposals/data";
import React from "react";

const CommunicationDetails = ({ formData, onChange, error }) => {
  return (
    <div className="flex-column gap-30">
      <Input
        name="address"
        placeholder="Address"
        variant="outlined"
        value={formData?.address}
        required
        onChange={onChange}
        error={error?.address}
        helperText={error?.address ? "Please enter Title" : ""}
      />
      <SelectInput
        name="country"
        label="Country"
        onChange={onChange}
        value={formData?.country}
        error={error?.country}
        helperText={error?.country ? "This field is required" : ""}
        options={Object.keys(COUNTRY_STATE_LIST)}
        height="40px"
      />
      <div className="flex gap-20">
        <SelectInput
          name="state"
          label="State"
          onChange={onChange}
          value={formData?.state}
          error={error?.state}
          helperText={error?.state ? "This field is required" : ""}
          options={
            COUNTRY_STATE_LIST[formData?.country] ?? [
              "Please Select country first",
            ]
          }
          height="40px"
        />
        <Input
          name="city"
          placeholder="City"
          variant="outlined"
          value={formData?.city}
          required
          onChange={onChange}
          error={error?.city}
          helperText={error?.city ? "Please enter Title" : ""}
        />
      </div>
      <Input
        name="pincode"
        placeholder="Pin-Code"
        variant="outlined"
        value={formData?.pincode}
        required
        onChange={onChange}
        error={error?.pincode}
        helperText={error?.pincode ? "Please enter Title" : ""}
      />
      <div className="flex gap-20">
        <Input
          name="phone1"
          placeholder="Primary Phone"
          variant="outlined"
          value={formData?.phone1}
          required
          onChange={onChange}
          error={error?.phone1}
          helperText={error?.phone1 ? "Please enter Title" : ""}
        />
        <Input
          name="phone2"
          placeholder="Secondary Phone"
          variant="outlined"
          value={formData?.phone2}
          required
          onChange={onChange}
          error={error?.phone2}
          helperText={error?.phone2 ? "Please enter Title" : ""}
        />
      </div>
    </div>
  );
};

export default CommunicationDetails;
