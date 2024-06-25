import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function BasicTimeline({ title, connector, color, dotIcon }) {
  const bgColor = {
    success: "#2E7D32",
    primary: "#1976D2",
    grey: "#BDBDBD",
  };
  return (
    <Timeline
      className="timeline-class"
      sx={{
        margin: 0,
        padding: "0px",
        [`& .${timelineItemClasses.root}:before`]: {
          display: "none",
        },
        [`& .${timelineItemClasses.root}`]: {
          marginBottom: "0px !important",
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            color={color}
            sx={{
              margin: "2px",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dotIcon}
          </TimelineDot>
          {connector && <TimelineConnector sx={{ bgcolor: bgColor[color] }} />}
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: "12px" }}>{title}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
