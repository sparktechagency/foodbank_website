import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Button,
  Dropdown,
  Menu,
  message,
  Modal,
  Pagination,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { AddEventModal } from "./AddEventModal";
import { Calender } from "./Calender";
import { UpdateEvent } from "./UpdateEvent";
import {
  useDeleteEventMutation,
  useGetEventQuery,
} from "../../page/redux/api/eventApi";
import { NoData } from "../../Basic/NoData";
import { Loading } from "../../Basic/Loading";
import Download from "./Download";

const Events = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchQuery, setSearch] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [eventType, setEventType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [editModal, setEditModal] = useState({ isOpen: false, group: null });
  const [activeTab, setActiveTab] = useState("list");
  const [modal2Open, setModal2Open] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading } = useGetEventQuery({
    filterType,
    searchQuery: searchQuery,
    eventType: eventType,
    sortOrder: sortOrder,
    page: currentPage,
    limit: pageSize,
  });
  console.log(data)

  const [deleteEvent] = useDeleteEventMutation();

  if (isLoading) {
    return (
      <p>
        <Loading></Loading>
      </p>
    );
  }

  const handleEdit = (group) => {
    setEditModal({
      isOpen: true,
      group,
    });
  };

  const handleDownload = (eventId) => {
    console.log(eventId)
    setOpenAddModal({
      isOpen: true,
      eventId,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete event?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteEvent(id).unwrap();
          message.success(response?.message);
        } catch (error) {
          message.error(error?.data?.message);
        }
      },
    });
  };

  const handleYearChange = (value) => {
    setFilterType(value);
  };

  const handleEventChange = (value) => {
    setEventType(value);
  };

  const handleShortChange = (value) => {
    setSortOrder(value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <div className="flex items-center w-full px-1 border-b border-gray-300 lg:mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Event"
              className="flex-1 py-3 ml-2 text-sm text-gray-700 placeholder-gray-400 bg-white outline-none"
            />
          </div>

          <div>
            <div className="gap-2 mt-3 lg:flex">
              {/* Tabs for List and Calendar View */}
              <div>
                <div className="flex bg-[#EDF0F2] w-[280px] gap-4 rounded-lg p-[2px]">
                  <button
                    onClick={() => setActiveTab("list")}
                    className={`${
                      activeTab === "list" ? "bg-white" : "bg-transparent"
                    } rounded px-2 py-[8px]  w-[120px] whitespace-nowrap`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setActiveTab("calendar")}
                    className={`${
                      activeTab === "calendar" ? "bg-white" : "bg-transparent"
                    } py-1 rounded text-center w-[190px] whitespace-nowrap`}
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
                    placeholder="Select filterType" // Placeholder text
                    onChange={handleYearChange} // Pass the value directly
                    options={[
                      { value: "today", label: "Today" },
                      { value: "upcoming", label: "Upcoming" },
                      { value: "previous", label: "Previous" },
                    ]}
                  />
                </div>
                <div>
                  <Select
                    className="w-full h-[43px]"
                    placeholder="Select EventType"
                    onChange={handleEventChange}
                    options={[
                      { value: "MitzvahSunday", label: "Mitzvah Sunday" },
                      { value: "HolidayDrive", label: "Holiday Drive" },
                      { value: "PersonalShopper", label: "Personal Shopper" },
                    ]}
                  />
                </div>
                <div>
                  <Select
                    className="w-full h-[43px]"
                    placeholder="Sort By"
                    onChange={handleShortChange}
                    options={[
                      { value: "asc", label: "Sort By" },
                      { value: "desc", label: "Date" },
                    ]}
                  />
                </div>
              </div>

              <div className="hidden lg:block">
                <button
                  onClick={() => setModal2Open(true)}
                  className=" bg-[#234E6F] w-[130px] rounded-full whitespace-nowrap py-2 text-white"
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
            <div className="">
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
                  {data?.data?.data?.length > 0 ? (
                    data?.data?.data?.map((event, index) => {
                      const confirmWarehouse = event?.warehouse?.filter((e) => e.accept === true) || [];
                      const confirmDriver = event?.driver?.filter((e) => e.accept === true) || [];
                      const totalSpotsFilled =
                      confirmWarehouse?.length + confirmDriver?.length;
                      const warehouseNeeded =
                        event?.warehouseNeeded + event?.deliveryNeeded;

                      
                      return (
                        <tr
                          key={event._id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm ">
                            <Link to={`/event/eventDetails/${event?._id}`}>
                              {event?.eventName}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm ">
                            {(event?.eventType === "MitzvahSunday" &&
                              "Mitzvah Sunday") ||
                              (event?.eventType === "PersonalShopper" &&
                                "Personal Shopper") ||
                              (event?.eventType === "HolidayDrive" &&
                                "Holiday Drive") || 
                                (event?.eventType === "NorthBroward" &&
                                  "North Broward")}
                          </td>
                          <td className="px-4 py-3 text-sm ">
                            {new Date(event?.dayOfEvent).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {totalSpotsFilled}/{warehouseNeeded}
                          </td>
                          {/* <td className="flex justify-end px-4 py-3 text-sm text-gray-500">
                            <Dropdown overlay={menu} trigger={["click"]}>
                              <Button type="text" className="-my-3">
                                <BiDotsVerticalRounded />
                              </Button>
                            </Dropdown>
                          </td> */}
                          <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                            {/* <details className="dropdown">
                              <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                                <BiDotsVerticalRounded />
                              </summary>
                              <ul className="menu dropdown-content bg-white text-black rounded z-[1] right-0 w-44 p-2 shadow">
                                <li>
                                  <a onClick={() => handleEdit(event)}>Edit</a>
                                </li>
                                <li>
                                  <a onClick={() => handleDelete(event._id)}>
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </details> */}

                            <Dropdown
                              overlay={
                                <Menu
                                  items={[
                                    {
                                      key: "1",
                                      label: "Edit",
                                      onClick: () => handleEdit(event),
                                    },
                                    {
                                      key: "2",
                                      label: "Delete",
                                      onClick: () => handleDelete(event?._id),
                                    },
                                    {
                                      key: "3",
                                      label: "Download",
                                      // onClick: () => handleDelete(event?._id),
                                      onClick: () => handleDownload(event?._id),
                                    },
                                  ]}
                                />
                              }
                              trigger={["click"]}
                            >
                              <BiDotsVerticalRounded className="cursor-pointer" />
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        <NoData></NoData>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={data?.data?.meta?.totalCount || 0} // Updated to use meta.totalCount
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <Calender event={data?.data?.data}></Calender>
          )}
        </div>
      </div>


<Download event={openAddModal.eventId} setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}></Download>

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
