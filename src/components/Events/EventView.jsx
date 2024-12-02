import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { Link } from "react-router-dom";

const EventView = () => {
  const eventData = [
    {
      valunteerName: "September Holiday Drive 9/2",

      deliveryLocation: "9/2/24",
      carSize: "13/25",
      time: "13/25",
      driver: "13/25",
      assigned: "13/25",

      clients: "view",
    },
    {
      valunteerName: "September Holiday Drive 9/2",

      deliveryLocation: "9/2/24",
      carSize: "13/25",
      time: "13/25",
      driver: "13/25",
      assigned: "13/25",

      clients: "view",
    },
    {
      valunteerName: "September Holiday Drive 9/2",

      deliveryLocation: "9/2/24",
      carSize: "13/25",
      time: "13/25",
      driver: "13/25",
      assigned: "13/25",

      clients: "view",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(eventData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = eventData.slice(startIndex, endIndex);

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
      <div className=" px-5 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>{" "}
          <IoIosArrowForward className="mt-1" /> Mitzvah Sunday 10/28
        </h1>

        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mt-3">Clients</h1>

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
            <div>
            <div className="flex gap-5 mt-3 ">
              
              
              <span className="flex">
               
                Priority Sunday
              </span>
              <span>|</span>
              <span>Large Car</span>
            </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div>
            <div className="bg-[#E3F5FF] p-4 rounded-lg">
              <p>Client Assagnment</p>
              <h1 className="text-xl font-semibold">4/15</h1>
            </div>
            </div>
            <div>
            <div className="bg-[#E3F5FF] p-4 rounded-lg">
              <p>Client Assagnment</p>
              <h1 className="text-xl font-semibold">Hallandale</h1>
            </div>
            </div>
          </div>
        </div>
      </div>

      <table className="min-w-full border-collapse mx-5 mt-6 border border-gray-300">
        <thead>
          <tr className="bg-gray-100 ">
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Event Name
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Event Type
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">Date</th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Volunteer Spots
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Volunteer Spots
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Volunteer Spots
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Volunteer Spots
            </th>

            <th className=" px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className=" px-4 py-3 text-sm">{event.valunteerName}</td>

              <td className=" px-4 py-3 text-sm">{event.deliveryLocation}</td>
              <td className="px-4 py-3 text-sm">{event.carSize}</td>
              <td className="px-4 py-3 text-sm">{event.time}</td>
              <td className="px-4 py-3 text-sm">{event.driver}</td>
              <td className="px-4 py-3 text-sm">{event.assigned}</td>

              <td className="px-4 py-3 text-sm">
                <span className="bg-[#EDEDED] py-1 px-2 font-semibold rounded-full text-[#234E6F]">
                  {event.clients}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <Link to={"/event/eventDetails"}>
                  <BiDotsVerticalRounded />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, eventData.length)} of{" "}
          {eventData.length} items
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventView;
