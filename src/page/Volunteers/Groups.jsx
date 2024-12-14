import { Modal } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Groups = () => {
  const [modal2Open, setModal2Open] = useState(false);

  const [formData, setFormData] = useState({
    Holocaust: "",
    timeTo: "",
    deliveryDrivers: "",
    clients: [],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.Holocaust.trim())
      formErrors.Holocaust = "Holocaust is required.";

    if (!formData.timeTo) formErrors.timeTo = "End time is required.";
    if (!formData.deliveryDrivers)
      formErrors.deliveryDrivers = "Delivery drivers count is required.";
    if (formData.clients.length === 0) {
      formErrors.clients = "At least one client must be selected";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const availableClients = [
    "Alena Artmyeva",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleCheckboxChange = (client) => {
    if (formData.clients.includes(client)) {
      setFormData((prevData) => ({
        ...prevData,
        clients: prevData.clients.filter((c) => c !== client),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        clients: [...prevData.clients, client],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);

      setModal2Open(false);
      setFormData({
        Holocaust: "",
        clients: [],
        timeTo: "",
        deliveryDrivers: "",
      });
    }
  };

  const eventData = [
    {
      clientName: "Alena Molin",
      type:"Driver Volunteers",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      type:"Driver Volunteers",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      type:"Driver Volunteers",
      bags: "1",
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
    <div>
      <div>
      <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
        {/* Search Box */}
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
            placeholder="Search Group"
            className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className=" mt-4 flex justify-between gap-3 ">
        <div>
              <select className="border rounded py-2 bg-white" name="" id="">
                <option value="all client">All Client</option>
                <option value="Holocaust Survivors">Holocaust Survivors</option>
                <option value="Non- Holocaust Survivors">
                  Non- Holocaust Survivors
                </option>
              </select>
            </div>
            {/* Filters */}

            <div>
              <button
                onClick={() => setModal2Open(true)}
                className="w-[150px] bg-[#234E6F] rounded-full py-2 text-white"
              >
                +Create Group
              </button>
            </div>
        </div>
      </div>

        <div className="lg:mx-5 mx-2">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium">
                  All Volunteer Groups
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Volunteer Group Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  # of Volunteers
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
                  <Link to={'/volunteerDetails'}><td className="px-4 py-3 text-sm">{event.clientName}</td></Link>
                  <td className="px-4 py-3 text-sm">{event.type}</td>
                  <td className="px-4 py-3 text-sm">{event.bags}</td>
                  
                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    <details className="dropdown ">
                      <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                        <BiDotsVerticalRounded />
                      </summary>
                      <ul className="menu dropdown-content bg-white text-black rounded z-[1] right-0 w-44 p-2 shadow">
                        <li>
                          <a>Edit</a>
                        </li>
                        <li>
                          <a>Delete</a>
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

      <Modal
        title="Create Volunteers Group"
        centered
        open={modal2Open}
        onCancel={() => {
          setModal2Open(false);
          setFormData({
            Holocaust: "",
            timeTo: "",
            deliveryDrivers: "",
            clients: [],
          });
          setErrors({});
        }}
        footer={[
          <button
            key="save"
            onClick={handleSubmit}
            className="bg-[#234E6F] text-white rounded-full px-5 py-2"
          >
            Save
          </button>,
        ]}
      >
        <form>
          <label htmlFor="Holocaust">
            <span className="font-semibold">Volunteers Group name</span>
            <select
              className="w-full  border bg-white border-neutral-400 rounded-md py-2"
              name="Holocaust"
              id="Holocaust"
              value={formData.Holocaust}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="1">Primery Driver</option>
              <option value="2">2</option>
            </select>
            {errors.Holocaust && (
              <p className="text-red-500 text-sm">{errors.Holocaust}</p>
            )}
          </label>

          <div className="  mt-1">
            <label htmlFor="deliveryDrivers">
              <span className="font-semibold">Select Volunteers Type</span>
              <select
                className="w-full border mb-2 bg-white border-neutral-400 rounded-md py-2"
                name="deliveryDrivers"
                id="deliveryDrivers"
                value={formData.deliveryDrivers}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">Driver Volunteers</option>
                <option value="2">WareHouse Volunteers</option>
              </select>
              {errors.deliveryDrivers && (
                <p className="text-red-500 text-sm">{errors.deliveryDrivers}</p>
              )}
            </label>
          </div>

          <div className="  mt-1">
            <span className="font-semibold">
              Select Your Volunteer
            </span>
            <div className="relative mt-2">
              <div
                className="border border-gray-400 rounded p-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {formData.clients.length > 0
                  ? formData.clients.join(", ")
                  : "Select Clients"}
              </div>
              {isDropdownOpen && (
                <div className="bg-white border border-gray-300 rounded mt-1 w-full p-2">
                  {availableClients.map((client, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`client-${index}`}
                        className="mr-2 accent-red-200 cursor-pointer"
                        checked={formData.clients.includes(client)}
                        onChange={() => handleCheckboxChange(client)}
                      />
                      <label htmlFor={`client-${index}`}>{client}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errors.clients && (
              <p className="text-red-500 text-sm -mt-2 mb-2">
                {errors.clients}
              </p>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Groups;
