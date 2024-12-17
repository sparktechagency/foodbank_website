import { Modal } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Link } from "react-router-dom";

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

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    Holocaust: "",
    number: "",
    adress: "",
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
    if (!formData.first.trim()) formErrors.first = "Event first is required.";
    if (!formData.last.trim()) formErrors.last = "Event last is required.";
    if (!formData.Holocaust.trim())
      formErrors.Holocaust = "Holocaust is required.";

    if (!formData.number.trim())
      formErrors.number = "Event number is required.";

    if (!formData.adress.trim())
      formErrors.adress = "Event adress is required.";

    if (formData.clients.length === 0) {
      formErrors.clients = "At least one client must be selected";
    }
    if (!formData.warehouseVolunteers)
      formErrors.warehouseVolunteers = "Volunteers count is required.";

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
      setModal2Open(false);
      setFormData({
        first: "",
        last: "",
        email: "",
        Holocaust: "",
        number: "",
        adress: "",
        clients: [],
      });
    }
    console.log("Form Data:", formData);
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
            placeholder="Search Volunteers"
            className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className=" mt-4 flex justify-end gap-3 ">
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
                        <option value="None">None</option>
                        <option value="mitzvah Monday">mitzvah Monday</option>
                        <option value="mitzvah Sunday">mitzvah Sunday</option>
                      </select>
                    </span>
                  </span>
                </td>
                {/* মাল্টিপল সিলেক্ট চেকবক্স */}
                <td className="px-4 py-3 text-sm ">
                  <div
                    className="bg-[#EDEDED] w-[150px] h-[30px] px-2 py-1 rounded-full overflow-hidden  text-[#234E6F] cursor-pointer flex justify-between"
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
                        <a onClick={() => setModal2Open(true)}>Edit</a>
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

      <Modal
        title="Add Volunteers"
        centered
        open={modal2Open}
        onCancel={() => {
          setModal2Open(false);
          setFormData({
            first: "",
            last: "",
            email: "",
            Holocaust: "",
            number: "",
            adress: "",
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
          <div className="mt-4">
            <div className="flex gap-3">
              <label htmlFor="first">
                <span className="font-semibold">First Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="text"
                  name="first"
                  id="first"
                  value={formData.first}
                  onChange={handleInputChange}
                />
                {errors.first && (
                  <p className="text-red-500 text-sm">{errors.first}</p>
                )}
              </label>

              <label htmlFor="last">
                <span className="font-semibold">Last Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="text"
                  name="last"
                  id="last"
                  value={formData.last}
                  onChange={handleInputChange}
                />
                {errors.last && (
                  <p className="text-red-500 text-sm">{errors.last}</p>
                )}
              </label>
            </div>

            <label htmlFor="email">
              <span className="font-semibold">Email Address</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </label>

            <label htmlFor="number">
              <span className="font-semibold">Phone Number</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleInputChange}
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number}</p>
              )}
            </label>

            <label htmlFor="adress">
              <span className="font-semibold">Adress</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="adress"
                id="adress"
                value={formData.adress}
                onChange={handleInputChange}
              />
              {errors.adress && (
                <p className="text-red-500 text-sm">{errors.adress}</p>
              )}
            </label>
          </div>

          <label htmlFor="Holocaust">
            <span className="font-semibold">Is the Volunteer a Vip</span>
            <select
              className="w-full  border bg-white border-neutral-400 rounded-md py-2"
              name="Holocaust"
              id="Holocaust"
              value={formData.Holocaust}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
            {errors.Holocaust && (
              <p className="text-red-500 text-sm">{errors.Holocaust}</p>
            )}
          </label>

          <div className="  mt-1">
            <span className="font-semibold">
              Select Your Preferred Volunteer Role
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

export default AllVolunteers;
