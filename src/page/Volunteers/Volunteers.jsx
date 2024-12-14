import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosTimer,
} from "react-icons/io";
import { Link } from "react-router-dom";
import AllVolunteers from "./AllVolunteers";
import DriverVolunteers from "./DriverVolunteers";
import DriverGroup from "./DriverGroup";
import Groups from "./Groups";

const Volunteers = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen">
      <div className=" lg:px-5 px-2 lg:pt-10 pt-5">
        <div className="flex justify-between">
          <div>
            {activeTab === "list" && (
              <>
                {/* Pagination Controls */}

                <h1 className="text-2xl font-bold ">Volunteers</h1>
              </>
            )}

            {activeTab === "calendar" && (
              <div className="">
                {/* Calendar View */}
                <h1 className="text-2xl font-bold ">Driver Volunteers</h1>
              </div>
            )}

            {activeTab === "driverGroup" && (
              <div className="">
                {/* Calendar View */}
                <h1 className="text-2xl font-bold ">Warehouse Volunteers</h1>
              </div>
            )}

            {activeTab === "group" && (
              <div className="">
                {/* Calendar View */}
                <h1 className="text-2xl font-bold ">Volunteers Groups</h1>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:mt-10 mt-5  text-sm lg:text-base">
        <div className="flex gap-4 rounded-lg p-2 ">
          <button
            onClick={() => setActiveTab("list")}
            className={`${
              activeTab === "list"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } lg:px-2 py-1`}
          >
            All Volunteers
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`${
              activeTab === "calendar"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  lg:px-2`}
          >
            Driver Volunteers
          </button>

          <button
            onClick={() => setActiveTab("driverGroup")}
            className={`${
              activeTab === "driverGroup"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  lg:px-2`}
          >
            Warehouse Volunteers
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`${
              activeTab === "group"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  lg:px-2`}
          >
            Groups
          </button>
        </div>
        <hr />

        <div className="">
          {activeTab === "list" && (
            <>
              {/* Pagination Controls */}

              <AllVolunteers></AllVolunteers>
            </>
          )}
          {activeTab === "calendar" && (
            <div className="">
              {/* Calendar View */}
              <DriverVolunteers></DriverVolunteers>
            </div>
          )}

          {activeTab === "driverGroup" && (
            <div className="">
              {/* Calendar View */}
              <DriverGroup></DriverGroup>
            </div>
          )}

          {activeTab === "group" && (
            <div className="">
              {/* Calendar View */}
              <Groups></Groups>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
