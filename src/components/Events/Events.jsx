import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { message, Modal, Select } from "antd";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AddEventModal } from "./AddEventModal";
import { Calender } from "./Calender";
import { UpdateEvent } from "./UpdateEvent";
import { useDeleteEventMutation, useGetEventQuery } from "../../page/redux/api/eventApi";

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
  const [editModal, setEditModal] = useState({ isOpen: false, group: null });
  const [activeTab, setActiveTab] = useState("list");
  const [modal2Open, setModal2Open] = useState(false);
  const { data, isLoading } = useGetEventQuery();
  console.log(data);
  const [deleteEvent] = useDeleteEventMutation()

  // Fallback for loading or empty data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data?.data?.length) {
    return <p>No events found.</p>;
  }
  const handleEdit = (group) => {
    console.log("Editing Group:", group);
    setEditModal({
      isOpen: true,
      group,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this volunteer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteEvent(id).unwrap();
          message.success(response.message );
        } catch (error) {
          console.error("Error deleting volunteer:", error);
          message.error(error.data?.message );
        }
      },
    });
  };


  return (
    <div className="min-h-screen px-2 pt-5 lg:px-5 lg:pt-10">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Events</h1>
          <div className="block lg:hidden">
            <button
              onClick={() => setModal2Open(true)}
              className=" bg-[#234E6F] w-[100px] rounded-full py-2 text-white"
            >
              + Add Event
            </button>
          </div>
        </div>
        <div className="justify-between lg:mt-5 lg:flex">
          {/* Search Box */}
          <div className="flex items-center w-full px-1 border-b border-gray-300 lg:mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
            </svg>
            <input
              type="text"
              placeholder="Search Event"
              className="flex-1 py-3 ml-2 text-sm text-gray-700 placeholder-gray-400 bg-white outline-none"
            />
          </div>

          <div>
            <div className="gap-2 mt-3 lg:flex">
              {/* Tabs for List and Calendar View */}
              <div>
                <div className="flex bg-[#EDF0F2] w-[230px] gap-4 rounded-lg p-[2px]">
                  <button
                    onClick={() => setActiveTab("list")}
                    className={`${
                      activeTab === "list" ? "bg-white" : "bg-transparent"
                    } rounded px-2 py-[8px]  w-[120px]`}
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
              <div className="flex justify-between gap-2 mt-3 lg:mt-0">
                <div>
                  <Select
                    className="w-full h-[43px]"
                    defaultValue="upcoming event"
                    options={[
                      { value: "upcoming event", label: "Upcoming Event" },
                      { value: "past events", label: "Past Events" },
                    ]}
                  />
                </div>
                <div>
                  <Select
                    className="w-full h-[43px]"
                    defaultValue="all events"
                    options={[
                      { value: "all events", label: "All Events Types" },
                      { value: "holiday drive", label: "Holiday Drive" },
                      { value: "mitzvah sunday", label: "Mitzvah Sunday" },
                    ]}
                  />
                </div>
                <div>
                  <Select
                    className="w-full h-[43px]"
                    defaultValue="all events"
                    options={[
                      { value: "all events", label: "Short By" },
                      { value: "name", label: "Name" },
                      { value: "date", label: "Date" },
                    ]}
                  />
                </div>
              </div>

              <div className="hidden lg:block">
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
            <div className="overflow-x-auto ">
              {/* Table View */}
              <table className="lg:w-full w-[1000px] border-collapse  border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="px-4 py-2 text-sm font-medium text-left ">
                      Event Name
                    </th>

                    <th className="px-4 py-2 text-sm font-medium text-left ">
                      Event Type
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-left ">
                      Date
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-left ">
                      Volunteer Spots Filled
                    </th>
                   
                    <th className="px-4 py-2 text-sm font-medium text-left "></th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((event, index) => {
                    const totalSpotsFilled =
                      event.warehouse.length + event.driver.length;
                      const warehouseNeeded = event.warehouseNeeded; // Example fixed value for warehouseNeeded
                    return (
                      <tr
                        key={event._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm ">
                          <Link to={"/event/eventDetails"}>{event.eventName}</Link>
                        </td>
                        <td className="px-4 py-3 text-sm ">{event.eventType}</td>
                        <td className="px-4 py-3 text-sm ">
                          {new Date(event.dayOfEvent).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {totalSpotsFilled}/{warehouseNeeded}
                        </td>
                        <td className="flex justify-end px-4 py-3 text-sm text-gray-500">
                          <details className="dropdown">
                            <summary className="btn m-1 -my-3 bg-[#ffffff00] shadow-none hover:bg-[#ffffff00] border-none">
                              <BiDotsVerticalRounded />
                            </summary>
                            <ul className="menu dropdown-content bg-white text-black rounded z-[1] right-0 w-44 p-2 shadow">
                              <li>
                                <a onClick={() => handleEdit(event)}>Edit</a>
                              </li>
                              <li>
                                <a onClick={() => handleDelete(event._id)}>Delete</a>
                              </li>
                            </ul>
                          </details>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "calendar" && <Calender></Calender>}
        </div>
      </div>

      <AddEventModal
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
      ></AddEventModal>
      <UpdateEvent
       isModalOpen={editModal.isOpen}
       setModal2Open1={setEditModal}
       event={editModal.group}
      ></UpdateEvent>
    </div>
  );
};

export default Events;
