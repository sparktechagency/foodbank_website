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

const Volunteers = () => {
  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      clientDelivery: "None",
      status: "Active",
      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      clientDelivery: "Mitzvah Sunday Week 1",
      status: "Inactive",
      bags: "6",
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      clientDelivery: "Mitzvah Sunday Week 2",
      status: "Active",
      bags: "3",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      clientDelivery: "None",
      status: "Active",
      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      clientDelivery: "Mitzvah Sunday Week 1",
      status: "Inactive",
      bags: "6",
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      clientDelivery: "Mitzvah Sunday Week 2",
      status: "Active",
      bags: "3",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      clientDelivery: "None",
      status: "Active",
      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      clientDelivery: "Mitzvah Sunday Week 1",
      status: "Inactive",
      bags: "6",
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      clientDelivery: "Mitzvah Sunday Week 2",
      status: "Active",
      bags: "3",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      clientDelivery: "None",
      status: "Active",
      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      clientDelivery: "Mitzvah Sunday Week 1",
      status: "Inactive",
      bags: "6",
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      clientDelivery: "Mitzvah Sunday Week 2",
      status: "Active",
      bags: "3",
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
      <div className=" px-5 pt-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold ">Volundeers</h1>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-5 mx-5 lg:flex justify-between">
        {/* Search Box */}
        <div className="flex items-center border-b border-gray-300 px-1 w-full mr-5">
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
            className="ml-2 flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="lg:flex mt-3 gap-3 ">
          {/* Tabs for List and Calendar View */}

          {/* Filters */}

          <div>
            <button
              onClick={() => setModal2Open(true)}
              className="w-[150px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              +Add Volunteer
            </button>
          </div>
        </div>
      </div>

      <div className="mx-5">
      <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Client Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Phone
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Alternate Phone #
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Holocaust Survivor
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Client Delivery Group
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Bags
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvents.map((event, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm">
                          {event.clientName}
                        </td>
                        <td className="px-4 py-3 text-sm">{event.phone}</td>
                        <td className="px-4 py-3 text-sm">{event.email}</td>
                        <td className="px-4 py-3 text-sm ">
                          <span className="flex">
                            <span className="bg-[#EDEDED] text-[#234E6F] pl-3 pr-2 gap-1 rounded-full p-1 flex">
                              {event.clientDelivery}
                              <IoIosArrowDown className="text-xl" />
                            </span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm flex">
                          <Link to={"/clients/clientsDetails"}>
                            <span className="bg-[#EDEDED] p-1 px-2 gap-1 text-[#234E6F]  rounded-full  flex">
                              {event.status}
                              <IoIosArrowDown className="text-xl" />
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm">{event.bags}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                          <BiDotsVerticalRounded />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      </div>

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

export default Volunteers;
