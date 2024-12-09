import { IoIosArrowBack, IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import Volunteers from "./Volunteers";
import { Link } from "react-router-dom";

const EventClientDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const clientData = [
    {
      eventName: "September Holiday Drive 9/2",
      event: "remove from Event",
    },
    {
      eventName: "September Holiday Drive 9/2",
      event: "Add to Event",
    },
  ];

  const addEventData = [
    {
      eventName: "max olis",
      event: "Remove from Event",
    },
    {
      eventName: "darhan dilo",
      event: "Remove from Event",
    },
    {
      eventName: "max olis",
      event: "Remove from Event",
    },
    {
      eventName: "darhan dilo",
      event: "Remove from Event",
    },
    {
      eventName: "darhan dilo",
      event: "Remove from Event",
    },
    {
      eventName: "darhan dilo",
      event: "Remove from Event",
    },
  ];


  const searchEventData = [
    {
      eventName: "max olis",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "max olis",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(addEventData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = addEventData.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] px-5 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>{" "}
          <IoIosArrowForward className="mt-1" /> Mitzvah Sunday 10/28
        </h1>

        <h1 className="text-2xl font-bold mt-3">Mitzvah Sunday 10/12</h1>

        <div className="flex gap-5 mt-3 ">
          <span className="flex">
            <IoIosTimer className="text-xl mt-[3px] mr-1" />
            10/28/2024, 8:30AM - 11AM
          </span>
          <span>|</span>
          <span className="flex">
            <CiLocationOn className="text-xl mt-[3px] mr-1" />
            The Cupboard
          </span>
          <span>|</span>
          <span>Mitzvah Day</span>
        </div>
        <div className="flex gap-4 rounded-lg p-[px] mt-6">
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

      <div className="px-5">
        {activeTab === "list" && (
          <>
            {/* Pagination Controls */}

            <div className="md:grid grid-cols-3 gap-4 max-w-[900px] mt-9 mb-11">
              <div className="rounded-xl shadow p-3">
                <h1>Holocaust Survivors</h1>
                <h1 className="text-2xl font-semibold mt-2">0</h1>
              </div>
              <div className="rounded-xl shadow p-3">
                <h1>Non-holocaust Survivors</h1>
                <h1 className="text-2xl font-semibold mt-2">0</h1>
              </div>
              <div className="rounded-xl shadow p-3">
                <h1>Total</h1>
                <h1 className="text-2xl font-semibold mt-2">0</h1>
              </div>
            </div>

            <div className="bg-[#F6F7F9] rounded my-5 p-5">
              <div className="grid grid-cols-2">
                <div>
                  <h1 className="font-semibold">Invite Clients</h1>
                  <p className="mt-2 mb-1">Client Groups</p>
                </div>
                <div>
                  <div className="grid grid-cols-2">
                    <p className="mt-8 mb-1 ml-2 ">Clients Added to Event</p>

                    <div className="flex items-center mt-4 w-full ">
                      <input
                        type="text"
                        className=" flex-1 outline-none text-sm bg-[#F6F7F9] text-gray-700 placeholder-gray-400"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:grid grid-cols-2 gap-4">
                <div className="bg-white border px-4 py-2 rounded">
                  {clientData.map((item) => (
                    <div className="flex justify-between space-y-4">
                      <h1 className="mt-2">{item.eventName}</h1>
                      <button className="bg-blue-600  text-white px-3 rounded-full text-sm">
                        {item.event}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white px-4 border py-2 rounded">
                  <div>
                    {currentEvents.map((event) => (
                      <div className="flex justify-between space-y-4">
                        <Link to={'/clients/clientsDetails'}><h1 className="mt-2">{event.eventName}</h1></Link>
                        <button className="bg-blue-600 text-white px-3 rounded-full text-sm">
                          {event.event}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end items-center mt-4 border-t ">
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className=" disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <IoIosArrowBack />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3  rounded-md ${
                              currentPage === page
                                ? " bg-gray-200 text-gray-700"
                                : "text-black"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className=" disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-300 px-1 py-3 my-3 mt-7 w-full mr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Event"
                    className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              <div className="bg-white border grid grid-cols-2 px-4 py-2 rounded">
                  <div className="">
                  {searchEventData.map((item) => (
                    <div className="flex justify-between space-y-4">
                      <Link to={'/clients/clientsDetails'}><h1 className="mt-2">{item.eventName}</h1></Link>
                      <button className="border border-blue-900  text-blue-900 px-3 rounded-full text-sm">
                        {item.event}
                      </button>
                    </div>
                  ))}
                  </div>
                </div>
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
            <Volunteers></Volunteers>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventClientDetailsPage;
