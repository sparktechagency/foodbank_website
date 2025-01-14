import { Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AddClientModal } from "./AddClientModal";
import { EditClienModalSec } from "./EditClienModalSec";

export const ClientsSectionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal2Open1, setModal2Open1] = useState(false);
  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alternatePhone: "956-3445-343-3234",
      holocaust: "yes",
      clientDelivery: "None",

      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      alternatePhone: "956-3445-343-3234",
      holocaust: "yes",
      clientDelivery: "Mitzvah Sunday Week 1",

      bags: "6",
    },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(eventData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = eventData.slice(startIndex, endIndex);

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
      <div className="mt-2 mb-5 lg:flex justify-between">
        {/* Search Box */}
        <div className="flex items-center py-3 border-b border-gray-300 px-1 w-full mr-5">
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
            placeholder="Search Clients"
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between mt-3 gap-3 ">
          {/* Tabs for List and Calendar View */}

          {/* Filters */}

          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all client"
              options={[
                { value: "all client", label: "All Client" },
                {
                  value: "Holocaust Survivors",
                  label: "Holocaust Survivors",
                },
                {
                  value: "Non- Holocaust Survivors",
                  label: "Non- Holocaust Survivors",
                },
              ]}
            />
          </div>
          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all events"
              options={[
                { value: "all events", label: "Short By" },
                { value: "holiday drive", label: "Name" },
                { value: "mitzvah sunday", label: "Date" },
              ]}
            />
          </div>

          <div className="">
            <button
              onClick={() => setModal2Open(true)}
              className="w-[100px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              + Add Client
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        {/* Table View */}
        <table className="lg:w-full w-[1000px]  border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Alternate Phone #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Holocaust Survivor
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Delivery Group
              </th>

              <th className="px-4 py-2 text-left text-sm font-medium">Bags</th>
              <th className="px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">
                  <Link to={"/clients/clientsDetails"}>{event.clientName}</Link>
                </td>
                <td className="px-4 py-3 text-sm">{event.phone}</td>
                <td className="px-4 py-3 text-sm">{event.alternatePhone}</td>
                <td className="px-4 py-3 text-sm">{event.holocaust}</td>
                <td className="px-4 py-3 text-sm ">
                  <span className="flex">
                    <span className=" gap-1 rounded-full  flex">
                      <select
                        className="bg-[#EDEDED] px-2  p-1 rounded-full text-[#234E6F]"
                        name="None"
                        id=""
                      >
                        <option value="None">None</option>
                        <option value="mitzvah Monday">mitzvah Monday</option>
                        <option value="mitzvah Sunday">mitzvah Sunday</option>
                      </select>
                    </span>
                  </span>
                </td>

                <td className="px-4 py-3 text-sm">{event.bags}</td>
                <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                  <details className="dropdown ">
                    <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                      <BiDotsVerticalRounded />
                    </summary>
                    <ul className="menu dropdown-content bg-white text-black rounded z-[1] right-0 w-44 p-2 shadow">
                      <li>
                        <a onClick={() => setModal2Open1(true)}>Edit</a>
                      </li>
                      <li>
                        <a onClick={() => handleDelete(index)}>Delete</a>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
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
      <AddClientModal
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
      ></AddClientModal>
      <EditClienModalSec
        setModal2Open1={setModal2Open1}
        modal2Open1={modal2Open1}
      ></EditClienModalSec>
    </div>
  );
};
