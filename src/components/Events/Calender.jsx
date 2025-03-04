import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";

const localizer = momentLocalizer(moment);

export const Calender = ({ event }) => {
  const myEventsList = event?.map((item) => {
    const totalVolunteers =
      (item?.driver?.length || 0) + (item?.warehouse?.length || 0);
    const totalNeeded = Number(item?.warehouseNeeded) + Number(item?.deliveryNeeded);

    const eventDate = new Date(item?.dayOfEvent);
    const startDateTime = moment(item?.startOfEvent, "h:mm A").toDate();
    const endDateTime = moment(item?.endOfEvent, "h:mm A").toDate();
    const startDate = new Date(eventDate);
    startDate.setHours(startDateTime.getHours(), startDateTime.getMinutes());

    const endDate = new Date(eventDate);
    endDate.setHours(endDateTime.getHours(), endDateTime.getMinutes());

    return {
      title: item?.eventName,
      start: startDate,
      end: endDate,
      allDay: false,
      totalVolunteers,
      totalNeeded,
    };
  }) || [];

  const eventStyleGetter = (event) => {
    const { totalVolunteers, totalNeeded } = event;
    const backgroundColor =
      totalVolunteers >= totalNeeded ? "green" : "orange"; // green if enough volunteers, orange if not
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "none",
      },
    };
  };

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
            eventPropGetter={eventStyleGetter} // Apply event styles dynamically
          />
        </div>
      </div>
    </div>
  );
};
