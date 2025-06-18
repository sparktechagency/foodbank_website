import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllGroupWarehouseEventQuery,
  useUpdateAddEventGroupMutation,
} from "../../page/redux/api/eventApi";
import { message, Spin } from "antd";
import { Loading } from "../../Basic/Loading";
import { ServerError } from "../../Basic/ServerError";
import { NoData } from "../../Basic/NoData";

export const SearchWarehouseGroup = ({ eventId }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearch] = useState("");

  const {
    data: warehouseGroup,
    isLoading,
    isError,
  } = useGetAllGroupWarehouseEventQuery({searchTerm});

  const [
    updateAddEventGroup,
    { isLoading: isMutating, isError: isMutationError },
  ] = useUpdateAddEventGroupMutation();

  const event = eventId?._id

  if (isLoading) return <Loading></Loading>
  if (isError || !warehouseGroup?.data) return <div><ServerError></ServerError></div>;
 
  const handleAddGroup = async (groupId) => {
    const data = {
      groupId,
      eventId: event,
      types: "warehouse",
    };
    setLoadingStates((prev) => ({ ...prev, [groupId]: true }));
    try {
      const response = await updateAddEventGroup({ data }).unwrap();
      
      message.success(response.message)
      setLoadingStates((prev) => ({ ...prev, [groupId]: false }));
    } catch (error) {
   
      
      message.error(error?.data?.message)
      
    }
  };

  const groups = eventId?.groups?.filter((data) => data?.type === "warehouse") || []; 
  const drivers = warehouseGroup?.data?.filter(grp1 => 
    !groups?.some(grp2 => grp1?._id.toString() === grp2?.gid?.id.toString())
  );

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
          placeholder="Search Group Warehouse Volunteers"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="w-full bg-white border px-4 py-2 rounded">
        <div>
        {drivers?.length > 0 ? (
          drivers?.map((group) => (
            <div
              key={group?._id}
              className="w-full flex justify-between items-center space-y-4"
            >
              <Link to={`/group/details/${group?._id}`}>
                <h1 className="mt-2">{group?.groupName}</h1>
              </Link>
              <button
                onClick={() => handleAddGroup(group?._id)}
                className="border border-blue-900 text-blue-900 px-3 rounded-full text-sm"
                disabled={loadingStates[group?._id]}
              >
                {loadingStates[group?._id] ? <Spin size="small" /> : "Add Groups"}
              </button>
            </div>
          ))
        ) : (
          <div className=" py-2"><NoData></NoData></div>
        )}
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
