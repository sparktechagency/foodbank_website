import { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useGetConfirmedDriverQuery } from "../../page/redux/api/eventApi";

const EventView = () => {
 
      
  const initialEventData = [
    {
      valunteerName: "Vallery Grovovsky",
      deliveryLocation: "Yes",
      carSize: "400 Lesile Drive",
      time: "Hallandale",
      driver: "Yes",
      assigned: 6,
      clients: "Assign",
    },
    {
      valunteerName: "John Doe",
      deliveryLocation: "No",
      carSize: "123 Main Street",
      time: "Miami",
      driver: "No",
      assigned: 4,
      clients: "Assign",
    },
    {
      valunteerName: "Jane Smith",
      deliveryLocation: "Yes",
      carSize: "789 Elm Street",
      time: "Fort Lauderdale",
      driver: "Yes",
      assigned: 5,
      clients: "Assign",
    },
  ];

  const [eventData, setEventData] = useState(initialEventData);
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

  // Toggle assign button functionality
  const toggleAssign = (index) => {
    const updatedEventData = [...eventData];
    updatedEventData[index].clients =
      updatedEventData[index].clients === "Assign" ? "Assigned" : "Assign";
    setEventData(updatedEventData);
  };

  return (
    <div className="min-h-screen">
      <div className="lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1">
          <span className="text-[#007AFF]">Ellen Belfer</span>{" "}
          <IoIosArrowForward className="mt-1" /> Mitzvah Sunday 10/28
        </h1>

        <div className="lg:flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mt-3">Clients</h1>
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
            <div className="flex gap-5 mt-3">
              <span className="flex">Priority Sunday</span>
              <span>|</span>
              <span>Large Car</span>
            </div>
          </div>
          <div className="lg:flex gap-3 mt-3 lg-mt-0">
            <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg">
                <p>Total Assigned : Ellen Befer</p>
                <h1 className="text-xl font-semibold">15</h1>
              </div>
            </div>
            <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg my-3 lg:my-0">
                <p>Client Assigned</p>
                <h1 className="text-xl font-semibold">4/15</h1>
              </div>
            </div>
            <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg">
                <p>Preferred Delivery Location</p>
                <h1 className="text-xl font-semibold">Hallandale</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mx-5 mx-2 overflow-x-auto">
        <table className="lg:w-full w-[1000px] border-collapse mt-6 border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Deliver Delivered to Client Before
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">City</th>
              <th className="px-4 py-2 text-left text-sm font-medium">VIP</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                # of Bags
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Clients
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">{event.valunteerName}</td>
                <td className="px-4 py-3 text-sm">{event.deliveryLocation}</td>
                <td className="px-4 py-3 text-sm">{event.carSize}</td>
                <td className="px-4 py-3 text-sm">{event.time}</td>
                <td className="px-4 py-3 text-sm">{event.driver}</td>
                <td className="px-4 py-3 text-sm">{event.assigned}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => toggleAssign(startIndex + index)}
                    className={`py-1 px-3 rounded-full font-semibold ${
                      event.clients === "Assign"
                        ? "bg-[#EDEDED] text-[#234E6F]"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {event.clients}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-5">
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
