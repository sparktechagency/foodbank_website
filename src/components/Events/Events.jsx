import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
const localizer = momentLocalizer(moment);
import { Modal } from "antd";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
const myEventsList = [
  {
    title: "Mitzvah Sunday",
    start: new Date(2024, 7, 11),
    end: new Date(2024, 7, 11),
    allDay: true,
  },
  {
    title: "Holiday Drive",
    start: new Date(2024, 7, 26),
    end: new Date(2024, 7, 26),
    allDay: true,
  },
];

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

const Events = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [modal2Open, setModal2Open] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    deliveryDrivers: "",
    warehouseVolunteers: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the specific field's error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check each required field
    if (!formData.name.trim()) {
      errors.name = "Event Name is required";
    }

    if (!formData.type.trim()) {
      errors.type = "Event Type is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.date.trim()) {
      errors.date = "Date is required";
    }

    if (!formData.timeFrom.trim()) {
      errors.timeFrom = "Start Time is required";
    }

    if (!formData.timeTo.trim()) {
      errors.timeTo = "End Time is required";
    }

    if (!formData.deliveryDrivers.trim()) {
      errors.deliveryDrivers = "Delivery Drivers is required";
    }

    if (!formData.warehouseVolunteers.trim()) {
      errors.warehouseVolunteers = "Warehouse Volunteers is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();

    // If there are any errors, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    // If validation passes, proceed with form submission
    console.log("Form Data:", formData);

    // Reset form and close modal
    setModal2Open(false);
    setFormData({
      name: "",
      type: "",
      location: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      deliveryDrivers: "",
      warehouseVolunteers: "",
    });
    setFormErrors({});
  };

  return (
    <div className="px-5 pt-10 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold">Events</h1>

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

          <div>
            <div className="lg:flex mt-3 gap-2">
              {/* Tabs for List and Calendar View */}
              <div>
                <div className="flex bg-[#EDF0F2] w-[230px] gap-4 rounded-lg p-[2px]">
                  <button
                    onClick={() => setActiveTab("list")}
                    className={`${
                      activeTab === "list" ? "bg-white" : "bg-transparent"
                    } rounded px-2 py-[8px] pl-8 w-[120px]`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setActiveTab("calendar")}
                    className={`${
                      activeTab === "calendar" ? "bg-white" : "bg-transparent"
                    } py-1 rounded text-center w-[120px]`}
                  >
                    Calendar View
                  </button>
                </div>
              </div>



              {/* Filters */}
              <div>
                <select className="border rounded py-2 " name="" id="">
                  <option value="upcoming event">Upcoming Event</option>
                  <option value="past events">Past Events</option>
                </select>
              </div>
              <div>
                <select className="border rounded py-2 " name="" id="">
                  <option value="all events">All Events</option>
                  <option value="holiday drive">Holiday Drive</option>
                  <option value="mitzvah sunday">Mitzvah Sunday</option>
                </select>
              </div>
              <div>
                <button
                  onClick={() => setModal2Open(true)}
                  className=" bg-[#234E6F] w-[100px] rounded-full py-2 text-white"
                >
                  + Add Event
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Based on Tab */}
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
                      <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                        <Link to={"/event/eventDetails"}>
                          <BiDotsVerticalRounded />
                        </Link>
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
              <div className="bg-white rounded-lg p-5">
                <Calendar
                  localizer={localizer}
                  events={myEventsList}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 700 }}
                />
              </div>
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
            name: "",
            type: "",
            location: "",
            date: "",
            timeFrom: "",
            timeTo: "",
            deliveryDrivers: "",
            warehouseVolunteers: "",
          });
          setFormErrors({});
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
            <label htmlFor="name">
              <span className="font-semibold">Event Name</span>
              <input
                className={`w-full border ${
                  formErrors.name ? "border-red-500" : "border-neutral-400"
                } mt-1 py-2 rounded-md mb-3`}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  {formErrors.name}
                </p>
              )}
            </label>

            <label htmlFor="type">
              <span className="font-semibold">Event Type</span>
              <select
                className={`w-full border ${
                  formErrors.type ? "border-red-500" : "border-neutral-400"
                } mt-1 py-2 rounded-md mb-3`}
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="mitzvah day">Mitzvah Day</option>
                <option value="tujbah day">Tujbah Day</option>
              </select>
              {formErrors.type && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  {formErrors.type}
                </p>
              )}
            </label>

            {/* Similar modifications for other form fields */}
            <label htmlFor="location">
              <span className="font-semibold">Location</span>
              <select
                className={`w-full border ${
                  formErrors.location ? "border-red-500" : "border-neutral-400"
                } mt-1 py-2 rounded-md`}
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Location</option>
                <option value="The Cupboard">The Cupboard</option>
                <option value="Tujbah Day">Tujbah Day</option>
              </select>
              {formErrors.location && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  {formErrors.location}
                </p>
              )}
            </label>

            {/* Date & Time section with similar error handling */}
            <div className="border border-neutral-400 mt-3 rounded-md">
              <h1 className="flex border-b border-neutral-400 p-3 font-semibold">
                <MdAccessTime className="mt-[2px] text-lg me-2" />
                Date & Time
              </h1>

              <div className="p-3 space-y-3">
                <label className="grid grid-cols-4" htmlFor="date">
                  <span className="col-span-1">On</span>
                  <input
                    className={`w-full border ${
                      formErrors.date ? "border-red-500" : "border-neutral-400"
                    } rounded px-1 col-span-3`}
                    type="text"
                    name="date"
                    id="date"
                    placeholder="Choose date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </label>
                {formErrors.date && (
                  <p className="text-red-500 text-sm -mt-2 mb-2">
                    {formErrors.date}
                  </p>
                )}

                <label className="grid grid-cols-4" htmlFor="timeFrom">
                  <span className="col-span-1">From</span>
                  <select
                    className={`w-full border ${
                      formErrors.timeFrom
                        ? "border-red-500"
                        : "border-neutral-400"
                    } rounded px-1 col-span-3`}
                    name="timeFrom"
                    id="timeFrom"
                    value={formData.timeFrom}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                  </select>
                </label>
                {formErrors.timeFrom && (
                  <p className="text-red-500 text-sm -mt-2 mb-2">
                    {formErrors.timeFrom}
                  </p>
                )}

                <label className="grid grid-cols-4" htmlFor="timeTo">
                  <span className="col-span-1">To</span>
                  <select
                    className={`w-full border col-span-3 ${
                      formErrors.timeTo
                        ? "border-red-500"
                        : "border-neutral-400"
                    } rounded px-1`}
                    name="timeTo"
                    id="timeTo"
                    value={formData.timeTo}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Time</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </label>
                {formErrors.timeTo && (
                  <p className="text-red-500 text-sm -mt-2 mb-2">
                    {formErrors.timeTo}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Drivers and Warehouse Volunteers sections */}
            <div className="flex gap-3 mt-3">
              <label className="w-full" htmlFor="deliveryDrivers">
                <span className="font-semibold">Delivery Drivers Needed</span>
                <select
                  className={`border w-full py-1 ${
                    formErrors.deliveryDrivers
                      ? "border-red-500"
                      : "border-neutral-400"
                  } rounded px-1`}
                  name="deliveryDrivers"
                  id="deliveryDrivers"
                  value={formData.deliveryDrivers}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                {formErrors.deliveryDrivers && (
                  <p className="text-red-500 text-sm -mt-2 mb-2">
                    {formErrors.deliveryDrivers}
                  </p>
                )}
              </label>

              <label className="w-full" htmlFor="warehouseVolunteers">
                <span className="font-semibold">
                  Warehouse Volunteers Needed
                </span>
                <select
                  className={`border w-full ${
                    formErrors.warehouseVolunteers
                      ? "border-red-500"
                      : "border-neutral-400"
                  } rounded px-1 py-1`}
                  name="warehouseVolunteers"
                  id="warehouseVolunteers"
                  value={formData.warehouseVolunteers}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                {formErrors.warehouseVolunteers && (
                  <p className="text-red-500 text-sm -mt-2 mb-2">
                    {formErrors.warehouseVolunteers}
                  </p>
                )}
              </label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
