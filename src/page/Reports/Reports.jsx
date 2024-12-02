import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

import { Link } from "react-router-dom";
import ClientsDelivery from "../../components/clients/ClientsDelivery";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      
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
    <div className="px-5 pt-10 min-h-screen">
      <h1 className="text-2xl font-bold">Clients</h1>

      <div className="mt-10">
        <div className="flex gap-4 rounded-lg p-[px] ">
          <button
            onClick={() => setActiveTab("list")}
            className={`${
              activeTab === "list"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } px-2 py-1`}
          >
            Holocaust Survivor Signatures
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`${
              activeTab === "calendar"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  px-2`}
          >
            Delivery Activity
          </button>
        </div>
        <hr />

        <div className="">
          {activeTab === "list" && (
            <>
              <div className="mt-2 mb-5 lg:flex justify-between">
                {/* Search Box */}

                <div className="lg:flex mt-3 gap-3 ">
                  {/* Tabs for List and Calendar View */}

                  {/* Filters */}

                  <div>
                    <select className="border rounded py-2 " name="" id="">
                      <option value="August 2024">August 2024</option>
                      <option value="july 2024">
                        july 2024
                      </option>
                      <option value="june 2024">
                        june 2034
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer px-4 bg-[#234E6F] rounded-full py-2 text-center text-white inline-block"
                    >
                      Export to PDF
                    </label>
                    <input id="file-upload" type="file" className="hidden" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg">
                {/* Table View */}
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
                        
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4 px-4">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, eventData.length)} of {eventData.length}{" "}
                  items
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoIosArrowBack />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
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
                    )
                  )}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </>
          )}
          {activeTab === "calendar" && (
            <div className="">
              {/* Calendar View */}
              <ClientsDelivery></ClientsDelivery>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
