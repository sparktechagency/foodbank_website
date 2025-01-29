import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDeleteEventGroupMutation } from "../../../page/redux/api/eventApi";
import { message, Spin } from "antd"; // Import Spin for loading indicator
import { useDeleteEventClientGroupMutation } from "../../../page/redux/api/clientApi";
import { Link } from "react-router-dom";

export const InviteDriverVolunteers = ({ event }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [removeEventGroup] = useDeleteEventGroupMutation();
  const [deleteEventClient] = useDeleteEventClientGroupMutation();

  // Track loading states for "Remove Group" buttons
  const [removeGroupLoading, setRemoveGroupLoading] = useState({});

  // Track loading states for "Remove Driver" buttons
  const [removeDriverLoading, setRemoveDriverLoading] = useState({});

  const groups = event?.groups?.filter((data) => data?.type === "driver");

  const handleRemoveGroup = async (groupId) => {
    // Set loading state for this specific group
    setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: true }));

    const data = {
      groupId,
      eventId: event?._id,
      types: "driver",
    };

    try {
      const response = await removeEventGroup(data).unwrap();
      console.log("Group successfully removed from event:", response);
      message.success(response.message);
    } catch (error) {
      console.error("Error removing group from event:", error);
      message.error("Failed to remove group from the event.");
    } finally {
      // Reset loading state for this specific group
      setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  const handleRemoveEventGroup = async (email) => {
    // Set loading state for this specific driver
    setRemoveDriverLoading((prev) => ({ ...prev, [email]: true }));

    const data = {
      email,
      type: "driver",
    };

    try {
      const response = await deleteEventClient({ id: event?._id, data }).unwrap();
      console.log("Driver successfully removed from event:", response);
      message.success(response.message);
    } catch (error) {
      console.error("Error removing driver from event:", error);
      message.error("Failed to remove driver from the event.");
    } finally {
      // Reset loading state for this specific driver
      setRemoveDriverLoading((prev) => ({ ...prev, [email]: false }));
    }
  };

  const itemsPerPage = 4;
  const addEventData = [
    // Your static data here
  ];
  const totalPages = Math.ceil(addEventData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = addEventData.slice(startIndex, endIndex);

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
      <div className="grid grid-cols-2">
        <div>
          <div className="grid grid-cols-2">
            <div>
              <h1 className="font-semibold">Invite Driver Volunteers</h1>
              <p className="mt-2 mb-1">Driver Volunteers Group</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="grid grid-cols-2">
            <p className="mt-8 mb-1 ml-2">Drivers Volunteers Added to Event</p>
            <div className="flex items-center mt-4 w-full">
              <input
                type="text"
                className="flex-1 outline-none text-sm bg-[#F6F7F9] text-gray-700 placeholder-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 gap-4">
        {/* Driver Groups Section */}
        <div className="bg-white border px-4 py-2 rounded">
          {groups.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <Link to={`/group/details/${item?.gid?._id}`}><h1 className="mt-2">{item.gid.groupName}</h1></Link>
              <div>
                <button
                  onClick={() => handleRemoveGroup(item.gid._id)}
                  className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                  disabled={removeGroupLoading[item.gid._id]} // Disable button while loading
                >
                  {removeGroupLoading[item.gid._id] ? ( // Show loading spinner if loading
                    <Spin size="small" />
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Drivers Added to Event Section */}
        <div className="bg-white px-4 border py-2 rounded">
          <div>
            {event?.driver
              ?.filter((ev) => ev.accept === false) // Filter the array to include only ev.accept === false
              .map((ev, index) => (
                <div key={index} className="flex justify-between space-y-4">
                  <Link to={`/clients/clientsDetails/${ev?.userId?._id}`}>
                    <h1 className="mt-2">
                      {ev?.userId?.firstName} {ev?.userId?.lastName}
                    </h1>
                  </Link>
                  <button
                    onClick={() => handleRemoveEventGroup(ev?.email)}
                    className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                    disabled={removeDriverLoading[ev?.email]} // Disable button while loading
                  >
                    {removeDriverLoading[ev?.email] ? ( // Show loading spinner if loading
                      <Spin size="small" />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              ))}
          </div>
          <div className="flex justify-end items-center mt-4 border-t">
            <div className="flex gap-2 mt-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowBack />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 rounded-md ${
                    currentPage === page
                      ? "bg-gray-200 text-gray-700"
                      : "text-black"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};