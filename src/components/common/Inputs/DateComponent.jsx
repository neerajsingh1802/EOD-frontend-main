import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./input.scss";

const DateComponent = ({ onChange, value, disable }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={`flex items-center justify-between w-250 gap-2`}>
      <div className="fs-12 w-60p">
        <div className={`flex items-center inputPick h-35`}>
          <div className={`flex items-center  px-2`}>
            <CalendarMonthIcon />
          </div>
          <DatePicker
            className={`flex items-center bg-transparent date-input `}
            dateFormat="MMM dd, yyyy"
            disabled={disable}
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            selected={startDate}
            onChange={(date) => {
              onChange(date);
              setStartDate(date);
            }}
          />
        </div>
      </div>
      <div className="fs-12 w-35p">
        <div className={`flex items-center inputPick`}>
          <div className={`flex items-center px-2 text-2xl`}>
            <AccessTimeIcon />
          </div>
          <DatePicker
            className={`date-input  bg-transparent `}
            selected={startDate}
            onChange={(date) => {
              onChange(date);
              setStartDate(date);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm"
            disabled={disable}
          />
        </div>
      </div>
    </div>
  );
};

export default DateComponent;
