import React from "react";
import { Link } from "react-router-dom";
import {
  useGetAllGroupWarehouseEventQuery,
  useUpdateAddEventGroupMutation,
} from "../../page/redux/api/eventApi";
import { message } from "antd";

export const SearchWarehouseGroup = ({ eventId }) => {
  const {
    data: clientGroup,
    isLoading,
    isError,
  } = useGetAllGroupWarehouseEventQuery();

  const [
    updateAddEventGroup,
    { isLoading: isMutating, isError: isMutationError },
  ] = useUpdateAddEventGroupMutation();

  const event = eventId._id

  if (isLoading) return <p>Loading...</p>;
  if (isError || !clientGroup?.data) return <p>Error loading client groups.</p>;

  const handleAddGroup = async (groupId) => {
    const data = {
      groupId,
      eventId: event,
      types: "warehouse",
    };

    try {
      const response = await updateAddEventGroup({ data }).unwrap();
      console.log("Group successfully added to event:", response);
      message.success(response.message)
    } catch (error) {
   
      console.log("Error adding group to event:", error);
      message.error(error?.data?.message)
    }
  };

  const searchEventData = [
    {
      eventName: "max olis",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "max olis",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
    {
      eventName: "darhan dilo",
      event: "Add to Event",
    },
  ];

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
          type="text"
          placeholder="Search Group Warehouse Volunteers"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="bg-white border lg:grid grid-cols-2 px-4 py-2 rounded">
        <div>
          {clientGroup?.data?.map((group) => (
            <div
              key={group._id}
              className="flex justify-between items-center space-y-4"
            >
              <Link to={`/clients/groupDetails/${group._id}`}>
                <h1 className="mt-2">{group.groupName}</h1>
              </Link>
              <button
                onClick={() => handleAddGroup(group._id)}
                className="border border-blue-900 text-blue-900 px-3 rounded-full text-sm"
                disabled={isMutating}
              >
                {isMutating ? "Adding..." : "Add to Event"}
              </button>
            </div>
          ))}
        </div>
      </div>
      {isMutationError && (
        <p className="text-red-500 mt-4">
          An error occurred while adding the group.
        </p>
      )}
    </div>
  );
};
