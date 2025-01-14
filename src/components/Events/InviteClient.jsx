import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export const InviteClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const clientData = [
    {
      eventName: "September Holiday Drive 9/2",
      event: "Remove from Event",
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
    <div>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="font-semibold">Invite Clients</h1>
          <p className="mt-2 mb-1">Client Groups</p>
        </div>
        <div>
          <div className="hidden lg:block">
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
      </div>

      <div className="lg:grid grid-cols-2 gap-4">
        <div className="bg-white border px-4 py-2 rounded">
          {clientData.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <h1 className="mt-2">{item.eventName}</h1>
              <div>
                <button className="bg-blue-600  text-white px-3 rounded-full text-sm">
                  {item.event}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden ">
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

        <div className="bg-white px-4 border py-2 rounded">
          <div>
            {currentEvents.map((event, index) => (
              <div key={index} className="flex justify-between space-y-4">
                <Link to={"/clients/clientsDetails"}>
                  <h1 className="mt-2">{event.eventName}</h1>
                </Link>
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
    </div>
  );
};
