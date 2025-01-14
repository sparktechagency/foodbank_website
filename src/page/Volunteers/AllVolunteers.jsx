import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AddAllvolunteerModal } from "./AddAllvolunteerModal";
import { EditAllVolunteerGroup } from "./EditAllVolunteerGroup";

const AllVolunteers = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (event, rowIndex) => {
    const { value, checked } = event.target;

    setSelectedOptions((prev) => {
      const updatedOptions = prev[rowIndex] || [];
      return {
        ...prev,
        [rowIndex]: checked
          ? [...updatedOptions, value]
          : updatedOptions.filter((item) => item !== value),
      };
    });
  };

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const [modal2Open, setModal2Open] = useState(false);
  const [modal2Open1, setModal2Open1] = useState(false);

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        eventData.splice(index, 1);
        Swal.fire("Deleted!", "The admin has been deleted.", "success");
      }
    });
  };

  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      email: "foisal@gmail.com",
      vip: "Yes",
      clientDelivery: "None",
      status: "Active",
      bags: "1",
    },
    {
      clientName: "Jose Root",
      phone: "01693454373",
      email: "ssdf#gmail.com",
      vip: "Yes",
      clientDelivery: "Mitzvah Sunday Week 1",
      status: "Inactive",
      bags: "6",
    },
    {
      clientName: "Julite Khanom",
      phone: "01694349873",
      email: "ddfosis@gmail.com",
      vip: "Yes",
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
      <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
        <div className="flex items-center border-b py-3 border-gray-300 px-1 w-full mr-5">
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
            placeholder="Search Volunteers"
            className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className=" mt-4 flex justify-end gap-3 ">
          <div>
            <select className="border rounded py-2 bg-white" name="" id="">
              <option value="all events">Short By</option>
              <option value="holiday drive">Name</option>
              <option value="mitzvah sunday">Date</option>
            </select>
          </div>

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

      <div className="lg:mx-5 mx-2 overflow-x-auto">
        <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Volunteer Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Phone #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium">VIP</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Volunteer Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Volunteer Group
              </th>

              <th className="px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <Link to={"/clients/clientsDetails"}>
                  <td className="px-4 py-3 text-sm">{event.clientName}</td>
                </Link>
                <td className="px-4 py-3 text-sm">{event.phone}</td>
                <td className="px-4 py-3 text-sm">{event.email}</td>
                <td className="px-4 py-3 text-sm">{event.vip}</td>
                <td className="px-4 py-3 text-sm ">
                  <span className="">
                    <span className=" gap-1 rounded-full  ">
                      <select
                        className="bg-[#EDEDED] px-2  p-1 rounded-full text-[#234E6F]"
                        name="None"
                        id=""
                      >
                        <option value="mitzvah Monday">
                          Driver Volunteers
                        </option>
                        <option value="mitzvah Sunday">
                          Warehouse Volunteers
                        </option>
                      </select>
                    </span>
                  </span>
                </td>

                <td className="px-4 py-3 text-sm ">
                  <div
                    className="bg-[#EDEDED] w-[150px] h-[30px] pr-1 pl-3 py-2 rounded-full overflow-hidden  text-[#234E6F] cursor-pointer flex justify-between items-center"
                    onClick={() => toggleDropdown(index)}
                  >
                    {selectedOptions[index]?.join(", ") || "Select Options"}{" "}
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </div>

                  {activeDropdown === index && (
                    <div className="fixed mt-2 w-48  bg-white border rounded shadow-lg z-50">
                      {[
                        "mitzvah Monday",
                        "mitzvah Sunday",
                        "mitzvah Sundy",
                        "mitzva Sunday",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions[index]?.includes(option)}
                            onChange={(e) => handleOptionChange(e, index)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </td>

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
      <AddAllvolunteerModal
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
      ></AddAllvolunteerModal>
      <EditAllVolunteerGroup
        setModal2Open1={setModal2Open1}
        modal2Open1={modal2Open1}
      ></EditAllVolunteerGroup>
    </div>
  );
};
export default AllVolunteers;
