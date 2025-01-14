import { IoIosArrowBack, IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import Volunteers from "./Volunteers";
import { Link } from "react-router-dom";
import WhereHouseVolunteers from "./WhereHouseVolunteers";
import { HolocaustCardSection } from "./HolocaustCardSection";
import { InviteClient } from "./InviteClient";
import { SearchClient } from "./SearchClient";

const EventClientDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>{" "}
          <IoIosArrowForward className="mt-1" /> Mitzvah Sunday 10/28
        </h1>

        <h1 className="text-2xl font-bold mt-3">Mitzvah Sunday 10/12</h1>

        <div className="lg:flex lg:gap-5 mt-3 ">
          <span className="flex">
            <IoIosTimer className="lg:text-xl text-sm mt-[3px] mr-1" />
            10/28/2024, 8:30AM - 11AM
          </span>
          <span className="hidden lg:block">|</span>
          <span className="flex">
            <CiLocationOn className="lg:text-xl text-sm mt-[3px] mr-1" />
            The Cupboard
          </span>
          <span className="hidden lg:block">|</span>
          <span>Mitzvah Day</span>
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
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  px-2`}
          >
            Driver Volunteers
          </button>

          <button
            onClick={() => setActiveTab("warehouse")}
            className={`${
              activeTab === "warehouse"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  px-2`}
          >
            Warehouse Volunteers
          </button>
        </div>
        <hr />
      </div>

      <div className="lg:px-5 px-2">
        {activeTab === "list" && (
          <>
            <HolocaustCardSection></HolocaustCardSection>
            <div className="bg-[#F6F7F9] rounded my-5 lg:p-5 p-2">
              <InviteClient></InviteClient>

              <SearchClient></SearchClient>
            </div>
          </>
        )}

        {activeTab === "calendar" && (
          <div className="">
            {/* Calendar View */}
            <Volunteers></Volunteers>
          </div>
        )}

        {activeTab === "warehouse" && (
          <div className="">
            {/* Calendar View */}
            <WhereHouseVolunteers></WhereHouseVolunteers>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventClientDetailsPage;
