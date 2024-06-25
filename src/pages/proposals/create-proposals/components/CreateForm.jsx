import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SelectInput from "../../../../components/common/Inputs/SelectInput";
import MultiSelect from "../../../../components/common/Inputs/MultiSelect";
import Input from "components/common/Inputs/Input";
import TextBox from "components/common/Inputs/TextArea";
import Button from "components/common/Button";
import PlaceIcon from "@mui/icons-material/Place";
import { COUNTRY_STATE_LIST } from "../data";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateForm = ({
  handleChange,
  form,
  activeStep,
  formError,
  handleNext,
  handleBack,
  setForm,
  handleSaveForm,
}) => {
  const isDisabled = activeStep?.key !== "firstStep" ? true : false;
  const title =
    activeStep?.key === "firstStep"
      ? "Enter Proposal Details "
      : "Review Proposal Details";

  const handleDiscard = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      subCategory: "",
      currency: "INR (₹)",
      budgetRangeFrom: "",
      budgetRangeTo: "",
    });
  };
  return (
    <Card sx={{ margin: "auto", width: "100%", p: 3, borderRadius: "10px" }}>
      <Box className="flex items-center justify-between mb-4">
        <Typography className="fs-20 fw-700">{title}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: 2,
          }}
        >
          {activeStep?.key === "secondStep" && (
            <Button bordered classes="fs-14 h-20" onClick={handleBack}>
              Edit Proposal
            </Button>
          )}
          {activeStep?.key !== "firstStep" && (
            <Button bordered classes="fs-14 h-20">
              Clone Proposal
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "0px auto",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Input
          sx={{ width: "100%" }}
          name="title"
          placeholder="Title"
          value={form?.title}
          required
          disabled={isDisabled}
          onChange={handleChange}
          error={formError?.title}
          helperText={formError?.title ? "Please enter Title" : ""}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <SelectInput
            name="category"
            label="Category"
            onChange={handleChange}
            value={form?.category}
            disabled={isDisabled}
            error={formError?.category}
            helperText={formError?.category ? "This field is required" : ""}
            options={["Information Technology", "Travel", "Music"]}
          />
          <SelectInput
            name="subCategory"
            label="Sub-category"
            value={form?.subCategory}
            onChange={handleChange}
            disabled={isDisabled}
            error={formError?.subCategory}
            helperText={formError?.title ? "This field is required" : ""}
            options={[
              "Application Development",
              "Cloud Infrastructure Management",
              "DevOps",
              "Mobile App Development",
              "Web Development",
              "Network Architecture",
              "Network Security",
              "Software Testing and Quality Assurance",
            ]}
          />
        </Box>
        {activeStep === "firstStep" && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {!!form?.file ? form.file.name : "Upload file"}
            <VisuallyHiddenInput
              type="file"
              name="file"
              onChange={(e) => console.log(e.target.files[0])}
            />
          </Button>
        )}
        {/* <FileUploadButton /> */}

        <MultiSelect
          name="technology"
          label="Technology"
          error={formError?.technology}
          required
          disabled={isDisabled}
          options={[
            "Java",
            "C",
            "Nodejs",
            "C++",
            "Ruby",
            "Python",
            "React",
            "Nextjs",
            "Drupal",
            "Kotlin",
          ]}
          onChange={handleChange}
          value={form?.technology ?? []}
        />
        <TextBox
          name="description"
          classes="w-full"
          height={180}
          width={"100%"}
          value={form?.description}
          placeholder="Description"
          onChange={handleChange}
          error={formError?.description}
        />
        <Box>
          <Typography
            className="ml-2 mb-3"
            sx={{ fontWeight: 700, fontSize: "18px" }}
          >
            Budget
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
          >
            <div className="w-50p">
              <SelectInput
                name="currency"
                label="Currency"
                disabled={isDisabled}
                defaultValue="INR (₹)"
                onChange={handleChange}
                helperText={formError?.currency ? "This field is required" : ""}
                value={form?.currency}
                error={formError?.currency}
                options={[
                  "INR (₹)",
                  "USD ($)",
                  "EURO (€)",
                  "AUD ($)",
                  "SGD ($)",
                ]}
              />
            </div>
            <Input
              sx={{ width: "100%" }}
              id="outlined-basic"
              name="budgetRangeFrom"
              placeholder="From"
              value={form?.budgetRangeFrom}
              error={formError?.budgetRangeFrom}
              helperText={
                formError?.budgetRangeFrom ? "This Field is required" : ""
              }
              variant="outlined"
              type="number"
              required
              disabled={isDisabled}
              icon={
                form?.currency === "INR (₹)"
                  ? "₹"
                  : form?.currency === "EURO (€)"
                  ? "€"
                  : "$"
              }
              onChange={handleChange}
            />
            <Input
              sx={{ width: "100%" }}
              id="outlined-basic"
              name="budgetRangeTo"
              value={form?.budgetRangeTo}
              error={formError?.budgetRangeTo}
              helperText={
                formError?.budgetRangeTo ? "This Field is required" : ""
              }
              placeholder="To"
              variant="outlined"
              type="number"
              required
              icon={
                form?.currency === "INR (₹)"
                  ? "₹"
                  : form?.currency === "EURO (€)"
                  ? "€"
                  : "$"
              }
              disabled={isDisabled}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <div className="flex items-center gap-20">
          <SelectInput
            name="country"
            label="Country"
            onChange={handleChange}
            value={form?.location}
            error={formError?.location}
            helperText={
              formError?.title ? "Please Select at least one location " : ""
            }
            icon={<PlaceIcon />}
            disabled={isDisabled}
            options={Object.keys(COUNTRY_STATE_LIST)}
          />
          <SelectInput
            name="state"
            label="State"
            onChange={handleChange}
            value={form?.location}
            error={formError?.location}
            helperText={
              formError?.title ? "Please Select at least one location " : ""
            }
            icon={<PlaceIcon />}
            disabled={isDisabled}
            options={
              COUNTRY_STATE_LIST[form?.country] ?? [
                "Please Select country first",
              ]
            }
          />
        </div>
        <MultiSelect
          name="location"
          label="Location"
          error={formError?.technology}
          required
          disabled={isDisabled}
          options={[
            "Noida",
            "Delhi",
            "Gurugram",
            "Banglore",
            "Hyderabad",
            "Pune",
            "Chennai",
            "Chandigarh",
          ]}
          onChange={handleChange}
          value={form?.location ?? []}
        />
      </Box>
      {activeStep?.key === "firstStep" && (
        <div className="btn-component mt-5">
          <Button bordered classes="fs-14" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button onClick={handleSaveForm} classes="fs-14">
            Save Proposal Details
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CreateForm;
