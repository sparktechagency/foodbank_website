import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";

const localizer = momentLocalizer(moment);
export const Calender = () => {
  const myEventsList = [
    {
      title: "Mitzvah Sunday",
      start: new Date(2024, 7, 11),
      end: new Date(2024, 7, 11),
      allDay: true,
    },
    {
      title: "Holiday Drive",
      start: new Date(2024, 7, 26),
      end: new Date(2024, 7, 26),
      allDay: true,
    },
  ];

  return (
    <div>
      <div className="bg-white border rounded-lg lg:p-5">
        {/* Calendar View */}
        <div className="p-1 bg-white rounded-lg lg:p-5">
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};
