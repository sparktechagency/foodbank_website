import { Modal } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdAccessTime } from "react-icons/md";

const Clients = () => {
  const [activeTab, setActiveTab] = useState("list");

  const [modal2Open, setModal2Open] = useState(false);

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    number: "",
    adress: "",
    apartment: "",
    city: "",
            state: "",
            zipcode: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    deliveryDrivers: "",
    warehouseVolunteers: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error message when user types
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    if (!formData.first.trim()) formErrors.first = "Event first is required.";
    if (!formData.last.trim()) formErrors.last = "Event last is required.";
    if (!formData.email.trim()) formErrors.email = "Event last is required.";
    if (!formData.number.trim())
      formErrors.number = "Event number is required.";
    if (!formData.adress.trim())
      formErrors.adress = "Event adress is required.";
    if (!formData.apartment.trim())
      formErrors.apartment = "Event apartment is required.";
    if (!formData.city) formErrors.city = "Event city is required.";
    if (!formData.state) formErrors.state = "Event state is required.";

    if (!formData.zipcode) formErrors.zipcode = "zipcode is required.";
    if (!formData.date) formErrors.date = "Date is required.";
    if (!formData.timeFrom) formErrors.timeFrom = "Start time is required.";
    if (!formData.timeTo) formErrors.timeTo = "End time is required.";
    if (!formData.deliveryDrivers)
      formErrors.deliveryDrivers = "Delivery drivers count is required.";
    if (!formData.warehouseVolunteers)
      formErrors.warehouseVolunteers = "Volunteers count is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);

      // Close Modal and reset form
      setModal2Open(false);
      setFormData({
        first: "",
        last: "",
        email: "",
        number: "",
        adress: "",
        apartment: "",
        city: "",
            state: "",
            zipcode: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        deliveryDrivers: "",
        warehouseVolunteers: "",
      });
    }
  };

  const eventData = [
    {
      eventName: "September Holiday Drive 9/2",
      eventType: "Holiday Drive",
      date: "9/2/24",
      volunteerSpots: "13/25",
    },
    {
      eventName: "Mitzvah Sunday 10/14",
      eventType: "Mitzvah Day",
      date: "10/14/24",
      volunteerSpots: "25/25",
    },
    {
      eventName: "Mitzvah Sunday 10/28",
      eventType: "Mitzvah Day",
      date: "10/28/24",
      volunteerSpots: "11/25",
    },
  ];

  return (
    <div className="px-5 pt-10 min-h-screen">
      <h1 className="text-2xl font-bold">Clients</h1>

      <div className="mt-10">
        <div className="flex w-[215px] gap-4 rounded-lg p-[px] ">
          <button
            onClick={() => setActiveTab("list")}
            className={`${
              activeTab === "list"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } px-2 py-1`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`${
              activeTab === "calendar"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  px-2`}
          >
            Calendar View
          </button>
        </div>
        <hr />

        <div className="mt-5 lg:flex justify-between">
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

          <div className="lg:flex mt-3 gap-3">
            {/* Tabs for List and Calendar View */}

            {/* Filters */}

            <div>
              <select className="border rounded py-2 " name="" id="">
                <option value="all client">All Client</option>
                <option value="Holocaust Survivors">Holocaust Survivors</option>
                <option value="Non- Holocaust Survivors">
                  Non- Holocaust Survivors
                </option>
              </select>
            </div>
            <div>
              <button
                onClick={() => setModal2Open(true)}
                className="w-[100px] bg-[#234E6F] rounded-full py-2 text-white"
              >
                + Add Event
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {activeTab === "list" && (
            <div className=" rounded-lg ">
              {/* Table View */}
              <table className="min-w-full border-collapse  border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Event Name
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Event Type
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Date
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Volunteer Spots Filled
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Volunteer Spots Filled
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Volunteer Spots Filled
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.map((event, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className=" px-4 py-3 text-sm">{event.eventName}</td>
                      <td className=" px-4 py-3 text-sm">{event.eventType}</td>
                      <td className=" px-4 py-3 text-sm">{event.date}</td>
                      <td className="px-4 py-3 text-sm">
                        {event.volunteerSpots}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {event.volunteerSpots}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {event.volunteerSpots}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                        <BiDotsVerticalRounded />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "calendar" && (
            <div className="border rounded-lg p-5 bg-white">
              {/* Calendar View */}
              <div className="bg-white rounded-lg p-5"></div>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Add Event"
        centered
        open={modal2Open}
        onCancel={() => {
          setModal2Open(false);
          setFormData({
            first: "",
            last: "",
            email: "",
            number: "",
            adress: "",
            apartment: "",
            city: "",
            state: "",
            zipcode: "",
            date: "",
            timeFrom: "",
            timeTo: "",
            deliveryDrivers: "",
            warehouseVolunteers: "",
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
                  className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
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
                  className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
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
              <span className="font-semibold">Email Adress</span>
              <input
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
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
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
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
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
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

            <label htmlFor="apartment">
              <span className="font-semibold">Apartment, suite, etc. *</span>
              <input
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="apartment"
                id="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm">{errors.apartment}</p>
              )}
            </label>
          </div>

          <div className="flex gap-3">
            <label htmlFor="city">
              <span className="font-semibold">city</span>
              <select
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                <option value="">Select Event Type</option>
                <option value="mitzvah day">Mitzvah Day</option>
                <option value="tujbah day">Tujbah Day</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </label>

            <label htmlFor="state">
              <span className="font-semibold">state</span>
              <select
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">Select Event Type</option>
                <option value="mitzvah day">Mitzvah Day</option>
                <option value="tujbah day">Tujbah Day</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </label>

            <label htmlFor="zipcode">
              <span className="font-semibold">zipcode</span>
              <select
                className="w-full border border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="zipcode"
                id="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                <option value="The Cupboard">The Cupboard</option>
                <option value="Tujbah Day">Tujbah Day</option>
              </select>
              {errors.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </label>
          </div>

          
          

          <div className="  mt-3">
            <label htmlFor="deliveryDrivers">
              <span className="font-semibold">Delivery Drivers Needed</span>
              <select
                className="w-full border mb-2 border-neutral-400 rounded-md py-2"
                name="deliveryDrivers"
                id="deliveryDrivers"
                value={formData.deliveryDrivers}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {errors.deliveryDrivers && (
                <p className="text-red-500 text-sm">{errors.deliveryDrivers}</p>
              )}
            </label>

            <label htmlFor="warehouseVolunteers">
              <span className="font-semibold">Warehouse Volunteers Needed</span>
              <select
                className="w-full  border border-neutral-400 rounded-md py-2"
                name="warehouseVolunteers"
                id="warehouseVolunteers"
                value={formData.warehouseVolunteers}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {errors.warehouseVolunteers && (
                <p className="text-red-500 text-sm">
                  {errors.warehouseVolunteers}
                </p>
              )}
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Clients;
