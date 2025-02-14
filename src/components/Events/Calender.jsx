import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";

const localizer = momentLocalizer(moment);

export const Calender = ({ event }) => { 
  const myEventsList = event.map((item) => {

    const eventDate = new Date(item.dayOfEvent);
    const startDateTime = moment(item.startOfEvent, "h:mm A").toDate();
    const endDateTime = moment(item.endOfEvent, "h:mm A").toDate();
    const startDate = new Date(eventDate);
    startDate.setHours(startDateTime.getHours(), startDateTime.getMinutes());

    const endDate = new Date(eventDate);
    endDate.setHours(endDateTime.getHours(), endDateTime.getMinutes());

    return {
      title: item.eventName, 
      start: startDate,  
      end: endDate,  
      allDay: false, 
    };
  }) || [];

  console.log("Formatted Events:", myEventsList);

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
