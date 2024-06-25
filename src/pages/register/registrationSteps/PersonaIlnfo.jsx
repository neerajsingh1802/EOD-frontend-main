import React from "react";
import SelectInput from "../../../components/common/Inputs/SelectInput";
import Input from "components/common/Inputs/Input";

const PersonalInfo = ({ formData, onChange, error }) => {
  return (
    <div className="flex-column gap-30 rounded-40">
      <div className="flex gap-10">
        <Input
          sx={{ width: "100%" }}
          id="outlined-basic"
          name="firstName"
          placeholder="First Name"
          variant="outlined"
          value={formData?.firstName}
          required
          disabled
          onChange={onChange}
        />
        <Input
          sx={{ width: "100%" }}
          id="outlined-basic"
          name="lastName"
          placeholder="Last Name"
          variant="outlined"
          value={formData?.lastName}
          required
          disabled
          onChange={onChange}
        />
      </div>
      <Input
        sx={{ width: "100%" }}
        id="outlined-basic"
        name="email"
        placeholder="Email"
        variant="outlined"
        value={formData?.email}
        type="email"
        disabled
        onChange={onChange}
      />
      <Input
        sx={{ width: "100%" }}
        id="outlined-basic"
        name="designation"
        placeholder="Designation"
        variant="outlined"
        value={formData?.designation}
        required
        onChange={onChange}
        error={error?.designation}
        helperText={error?.designation ? "This Field is Required" : ""}
      />
      <div className="flex gap-10">
        <SelectInput
          name="gender"
          label="Gender"
          onChange={onChange}
          value={formData?.gender}
          error={error?.gender}
          helperText={error?.gender ? "This field is required" : ""}
          options={["Male", "Female", "Others"]}
          height="40px"
        />
        <Input
          sx={{ width: "100%" }}
          id="outlined-basic"
          name="mob"
          type="number"
          placeholder="Mobile Number"
          variant="outlined"
          // InputProps={{
          //   inputProps: {
          //     style: {
          //       MozAppearance: "textfield",
          //     },
          //   },
          //   sx: {
          //     "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
          //       {
          //         WebkitAppearance: "none",
          //         margin: 0,
          //       },
          //   },
          // }}
          value={formData?.mob}
          required
          onChange={onChange}
          error={error?.mob}
          helperText={error?.mob ? "This Field is Required" : ""}
        />
      </div>
      <Input
        sx={{ width: "100%" }}
        id="outlined-basic"
        name="linkedin"
        placeholder="LinkedIn"
        variant="outlined"
        value={formData?.linkedin}
        required
        onChange={onChange}
        error={error?.linkedin}
        helperText={error?.linkedin ? "This Field is Required" : ""}
      />
    </div>
  );
};

export default PersonalInfo;
