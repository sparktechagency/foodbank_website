import { useState } from "react";

import {
  IoIosArrowBack,

  IoIosArrowForward,
} from "react-icons/io";
import { Link } from "react-router-dom";

const ClientDeliveryDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },

    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address:"10009 Brookfield Drive",
      city:"Hallandele",
      zipCode:"11234",
      bags: "1",
    },
  ];

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
      <div className="bg-[#FAFAFA] lg:px-5 px-2 py-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> Alena Armyeva
        </h1>

        <h1 className="text-2xl font-bold mt-3">Sunday Mitzvah Wee one</h1>
      </div>

      <div className="lg:px-5 px-2">
        <div className="flex items-center border-b py-6 border-gray-300 px-4 w-full mr-5">
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
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="lg:px-5 px-2 py-6 ">
        < div className="overflow-x-auto">
        <table className="lg:w-full w-[1000px]  border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone #</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Alternate Phone #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Adress
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                City
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Zip Code
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Bags
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm"><Link to={"/clients/clientsDetails"}>{event.clientName}</Link></td>
                <td className="px-4 py-3 text-sm">{event.phone}</td>
                <td className="px-4 py-3 text-sm">{event.alernatePhone}</td>
                <td className="px-4 py-3 text-sm">{event.address}</td>
                <td className="px-4 py-3 text-sm">{event.city}</td>
                <td className="px-4 py-3 text-sm">{event.zipCode}</td>
                

                <td className="px-4 py-3 text-sm">{event.bags}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4">
          <span className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, eventData.length)}{" "}
            of {eventData.length} items
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
    </div>
  );
};

export default ClientDeliveryDetailsPage;
