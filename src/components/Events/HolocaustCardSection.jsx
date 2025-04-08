import React from "react";
import { Link } from "react-router-dom";

export const HolocaustCardSection = ({event}) => {

  console.log(event, "event");
 
  return (
    <div>
      <div className="md:grid grid-cols-3 gap-4 max-w-[900px] mt-9 mb-11">
        <div className="rounded-xl shadow p-3">
          <h1>Holocaust Survivors</h1>
          <h1 className="text-2xl font-semibold mt-2">{event?.data?.holocaustSurvivors}</h1>
        </div>
        <div className="rounded-xl shadow p-3 my-4 lg:my-0">
          <h1>Non-Holocaust Survivors</h1>
          <h1 className="text-2xl font-semibold mt-2">{event?.data?.nonHolocaustSurvivors}</h1>
        </div>
        <div className="rounded-xl shadow p-3">
          <h1>Total</h1>
          <h1 className="text-2xl font-semibold mt-2">
            <Link className="text-indigo-400" to={`/event/confirmedClients/${event.data.event._id}`}>
            {event?.data?.total}
            </Link> </h1>
        </div>
      </div>
    </div>
  );
};
