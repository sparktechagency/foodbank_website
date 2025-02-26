import React from "react";
import { Link } from "react-router-dom";

export const VolunteertTable =  ({event}) => {
 
  const eventData = [
    {
      type: "Driver Volunteers",
      volunteers: "20",
      confirmed: "15",

      volunteersRespons: "10",
    },
  ];
  const acceptDriver =  event?.driver?.filter((data)=> data.accept===true)
  const pendingDriver =  event?.driver?.filter((data)=> data.accept===false)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Volunteers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse overflow-x-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100 ">
              <th className=" px-4 py-2 text-left text-sm font-medium">Type</th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Volunteers Needed
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Confirmed Volunteers
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Volunteer With No Response
              </th>
            </tr>
          </thead>
          <tbody> 
              <tr
                
                // className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className=" px-4 py-3 text-sm">{event.eventType}</td>
                <td className=" px-4 py-3 text-sm">{event.deliveryNeeded}</td>
                <td className=" px-4 py-3 text-sm text-[#007AFF] font-semibold underline">
                  <Link to={`/event/confirmedVolunteers/${event._id}`}>
                    {acceptDriver?.length}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-[#007AFF] font-semibold underline">
                <Link to={`/event/pending-Driver/${event._id}`}>{pendingDriver?.length}    </Link>
                </td>
              </tr> 
          </tbody>
        </table>
      </div>
    </div>
  );
};
