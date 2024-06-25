import React from "react";
import { Box, Card, Typography } from "@mui/material";
import BasicTimeline from "../../../../components/common/BasicTimeline";
import CreateForm from "./CreateForm";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const ReviewTab = ({ form, timelineList, handleBack, activeStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ width: "70%" }}>
          <CreateForm
            form={form}
            handleBack={handleBack}
            activeStep={activeStep}
          />
        </Box>
        <Card
          sx={{
            width: "30%",
            p: 3,
            borderRadius: "10px",
          }}
        >
          <Typography className="fs-20 fw-700">Approval Stages</Typography>
          <Box>
            <Typography sx={{ fontSize: "16px", margin: "40px 0px 20px 0px" }}>
              Approval 1: Org Confirmation
            </Typography>
            {timelineList?.map((item) => (
              <BasicTimeline
                title={item?.label}
                connector={item?.id < 3 ? true : false}
                color={
                  activeStep.key !== "secondStep"
                    ? item.id === 1
                      ? "success"
                      : item.id === 2
                      ? "warning"
                      : "grey"
                    : "grey"
                }
                dotIcon={
                  activeStep.key !== "secondStep" ? (
                    item.id === 1 ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <ErrorOutlineIcon />
                    )
                  ) : (
                    <ErrorOutlineIcon />
                  )
                }
              />
            ))}
          </Box>
          <Box>
            <Typography sx={{ fontSize: "16px", margin: "20px 0px" }}>
              Approval 2: Dept Confirmation
            </Typography>{" "}
            {timelineList?.map((item) => (
              <BasicTimeline
                title={item?.label}
                connector={item?.id < 3 ? true : false}
                // color={
                //   item.id === 1 ? "success" : item.id === 2 ? "primary" : "grey"
                // }
                dotIcon={<ErrorOutlineIcon />}
              />
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ReviewTab;
