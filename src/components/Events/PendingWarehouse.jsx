import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetConfirmedDriverQuery,
  useGetSingleEventGroupQuery,
} from "../../page/redux/api/eventApi";

export const PendingWarehouse = () => {
  const { id } = useParams();

  const {
    data: singleClientData,
    isLoading,
    isError,
  } = useGetSingleEventGroupQuery({ id }, { refetchOnMountOrArgChange: true });

  const event = singleClientData?.data?.event;

  const { data: confirmedDriver } = useGetConfirmedDriverQuery(
    { eventId: id, types: "warehouse", accept: "no" },
    { refetchOnMountOrArgChange: true }
  );

  const dayOfEvent = event?.dayOfEvent
    ? new Date(event?.dayOfEvent).toLocaleDateString()
    : "Unknown Date";
  const time =
    event?.startOfEvent && event?.endOfEvent
      ? `${event?.startOfEvent} - ${event?.endOfEvent}`
      : "Unknown Time";

  const result = confirmedDriver?.data?.data;
  
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen">
        <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
          <h1 className="flex gap-1 ">
            <Link to={"/"}>
              <span className="text-[#007AFF]">Events</span>
            </Link>
            <IoIosArrowForward className="mt-1 " />{" "}
            <button onClick={() => navigate(-1)} className="text-[#007AFF]">{event?.eventName}</button>
            <IoIosArrowForward className="mt-1 " /> Warehouse : Volunteers With
            Response
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-2xl font-bold mt-3"
          >
            {event?.eventName}
          </button>

          <div className="lg:flex lg:gap-5 mt-3 ">
            <span className="flex">
              <IoIosTimer className="lg:text-xl text-sm mt-[3px] mr-1" />
              {dayOfEvent}, {time}
            </span>
            <span className="hidden lg:block">|</span>
            <span className="flex">
              <CiLocationOn className="lg:text-xl text-sm mt-[3px] mr-1" />
              {event?.location}
            </span>
            <span className="hidden lg:block">|</span>
            <span>{event?.eventType?.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
          </div>
        </div>

        

        <div className="lg:mx-5 mx-2 overflow-x-auto">
          <table className="min-w-full border-collapse  mt-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-100 ">
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Name
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Type
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Preferred Delivery Location
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Vip Driver
                </th>
                {/* <th className=" px-4 py-2 text-left text-sm font-medium">
                  Assigned
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Clients
                </th> */}
              </tr>
            </thead>
            <tbody>
              {result &&
                result?.map((event, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className=" px-4 py-3 text-sm">
                      <Link to={`/volunteers/details/${event?.driver?.userId?._id}`}>
                        {event?.driver?.userId?.firstName} {event?.driver?.userId?.lastName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {event?.driver?.userId?.status
                        ? event?.driver?.userId?.status.charAt(0).toUpperCase() +
                          event?.driver?.userId?.status.slice(1)
                        : ""}
                    </td>
                    <td className=" px-4 py-3 text-sm">
                      {event?.driver?.userId?.address}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {event?.driver?.userId?.volunteerType === true ? "Yes" : "No"}
                    </td>
                    {/* <td className="px-4 py-3 text-sm">Working...</td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/event/eventView/${event?.userId?._id}`}>
                        <span className="bg-[#EDEDED] py-1 px-2 font-semibold rounded-full text-[#234E6F]">
                          View
                        </span>
                      </Link>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
