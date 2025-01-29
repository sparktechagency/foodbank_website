import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import {
  useGetAllGroupClientEventQuery,
  useUpdateAddEventGroupMutation,
} from "../../page/redux/api/eventApi";
import { message, Spin } from "antd"; // Import Spin for loading indicator

export const SearchClientGroups = ({ eventId }) => {
  const [searchTerm, setSearch] = useState("");
  const { data: clientGroup, isLoading, isError } = useGetAllGroupClientEventQuery({searchTerm});
  const [updateAddEventGroup] = useUpdateAddEventGroupMutation();
  const event = eventId._id;

  // Track loading state for each group
  const [loadingStates, setLoadingStates] = useState({});

  if (isLoading) return <p>Loading...</p>;
  if (isError || !clientGroup?.data) return <p>Error loading client groups.</p>;

  const handleAddGroup = async (groupId) => {
    // Set loading state for this specific group
    setLoadingStates((prev) => ({ ...prev, [groupId]: true }));

    const data = {
      groupId,
      eventId: event,
      types: "client",
    };

    try {
      const response = await updateAddEventGroup({ data }).unwrap();
      console.log("Group successfully added to event:", response);
      message.success(response.message);
    } catch (error) {
      console.log("Error adding group to event:", error);
      message.error(error?.data?.message);
    } finally {
      // Reset loading state for this specific group
      setLoadingStates((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  return (
    <div>
      <div className="flex items-center border-b border-gray-300 px-1 py-3 my-3 mt-7 w-full mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
        </svg>
        <input
        onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Clients Group"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="bg-white border lg:grid grid-cols-2 px-4 py-2 rounded">
        <div>
          {clientGroup?.data?.map((group) => (
            <div key={group._id} className="flex justify-between items-center space-y-4">
              <Link to={`/clients/ClientDeliveryDetailsPage/${group._id}`}>
                <h1 className="mt-2">{group.groupName}</h1>
              </Link>
              <button
                onClick={() => handleAddGroup(group._id)}
                className="border border-blue-900 text-blue-900 px-3 rounded-full text-sm flex items-center justify-center"
                disabled={loadingStates[group._id]} // Disable only this button
              >
                {loadingStates[group._id] ? ( // Show loading spinner only for this button
                  <Spin size="small" />
                ) : (
                  "Add to Event"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};