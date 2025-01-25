import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import Volunteers from "./Volunteers";
import { useParams } from "react-router-dom";
import WhereHouseVolunteers from "./WhereHouseVolunteers";
import { HolocaustCardSection } from "./HolocaustCardSection";
import { InviteClient } from "./InviteClient";
import { SearchClient } from "./SearchClient";
import { useGetSingleEventGroupQuery } from "../../page/redux/api/eventApi";
import { SearchClientGroups } from "./SearchClientGroups";
import { VolunteertTable } from "./DriverVolunteers/VolunteertTable";
import { InviteDriverVolunteers } from "./DriverVolunteers/InviteDriverVolunteers";
import { SearchDriverVolunteer } from "./DriverVolunteers/SearchDriverVolunteer";
import { SearchDriverVolunteersGroup } from "./SearchDriverVolunteersGroup";
import { InvitedWarehouseVolunteers } from "./WoriousVolunteers/InvitedWarehouseVolunteers";
import { SearchWarehouseVolunteer } from "./WoriousVolunteers/SearchWarehouseVolunteer";
import { SearchWarehouseGroup } from "./SearchWarehouseGroup";

const EventClientDetailsPage = () => {
  const { id } = useParams();
  const {
    data: singleClientData,
    isLoading,
    isError,
  } = useGetSingleEventGroupQuery({ id }, { refetchOnMountOrArgChange: true });

  console.log(singleClientData);
  const [activeTab, setActiveTab] = useState("list");

  // Event Details
  const event = singleClientData?.data?.event;

  const eventName = event?.eventName || "Unknown Event";
  const totalSpotsFilled = event?.warehouse.length + event?.driver.length;
  const warehouseNeeded = event?.warehouseNeeded;
  const location = event?.location || "Unknown Location";
  const dayOfEvent = event?.dayOfEvent
    ? new Date(event.dayOfEvent).toLocaleDateString()
    : "Unknown Date";
  const time =
    event?.startOfEvent && event?.endOfEvent
      ? `${event.startOfEvent} - ${event.endOfEvent}`
      : "Unknown Time";

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading event details.</p>;

  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>
          <IoIosArrowForward className="mt-1" /> {eventName} {totalSpotsFilled}/
          {warehouseNeeded}
        </h1>

        <h1 className="text-2xl font-bold mt-3">
          {eventName} {totalSpotsFilled}/{warehouseNeeded}
        </h1>

        <div className="lg:flex lg:gap-5 mt-3 ">
          <span className="flex">
            <IoIosTimer className="lg:text-xl text-sm mt-[3px] mr-1" />
            {dayOfEvent}, {time}
          </span>
          <span className="hidden lg:block">|</span>
          <span className="flex">
            <CiLocationOn className="lg:text-xl text-sm mt-[3px] mr-1" />
            {location}
          </span>
          <span className="hidden lg:block">|</span>
          <span>{event?.eventType || "Unknown Event Type"}</span>
        </div>
        <div className="flex gap-4 text-sm lg:text-base rounded-lg p-[px] mt-6">
          <button
            onClick={() => setActiveTab("list")}
            className={`${
              activeTab === "list"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } px-2 py-1`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`${
              activeTab === "calendar"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1 px-2`}
          >
            Driver Volunteers
          </button>

          <button
            onClick={() => setActiveTab("warehouse")}
            className={`${
              activeTab === "warehouse"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1 px-2`}
          >
            Warehouse Volunteers
          </button>
        </div>
        <hr />
      </div>

      <div className="lg:px-5 px-2">
        {activeTab === "list" && (
          <>
            <HolocaustCardSection event={singleClientData} />
            <div className="bg-[#F6F7F9] rounded my-5 lg:p-5 p-2">
              <InviteClient event={event} />
              <div className="grid grid-cols-2 gap-4">
                <SearchClientGroups eventId={event}></SearchClientGroups>
                <SearchClient eventId={event} />
              </div>
            </div>
          </>
        )}

        {activeTab === "calendar" && (
          <div>
            <div className="mt-5 ">
              <VolunteertTable event={event}></VolunteertTable>

              <div className="bg-[#F6F7F9] rounded my-5 lg:p-5 p-2">
                <InviteDriverVolunteers event={event}></InviteDriverVolunteers>
                <div className="grid grid-cols-2 gap-4">
                  <SearchDriverVolunteersGroup
                    eventId={event}
                  ></SearchDriverVolunteersGroup>
                  <SearchDriverVolunteer
                    eventId={event}
                  ></SearchDriverVolunteer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "warehouse" && (
          <div>
            <WhereHouseVolunteers event={event}/>

            <div className="bg-[#F6F7F9] rounded my-5 lg:p-5 p-2">
              <InvitedWarehouseVolunteers event={event}></InvitedWarehouseVolunteers>
              <div className="grid grid-cols-2 gap-4">
                <SearchWarehouseGroup eventId={event}></SearchWarehouseGroup>
                <SearchWarehouseVolunteer eventId={event}></SearchWarehouseVolunteer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventClientDetailsPage;
