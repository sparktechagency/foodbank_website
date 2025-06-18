import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import { useAddClientGroupMutation } from "../../../page/redux/api/clientApi";
import { message, Spin } from "antd"; // Import Spin for loading indicator
import { useGetAllDriverVolunteerQuery, useGetDriverQuery } from "../../../page/redux/api/volunteerApi";
import { NoData } from "../../../Basic/NoData";

export const SearchDriverVolunteer = ({ eventId }) => {
  const [searchTerm, setSearch] = useState("");
  const { data: clientData } = useGetAllDriverVolunteerQuery({searchTerm});
  const [updateClientGroup] = useAddClientGroupMutation();

  // Track loading state for each "Add Client" button
  const [loadingStates, setLoadingStates] = useState({});

  const handleAddGroup = async (client) => {
    // Set loading state for this specific client
    setLoadingStates((prev) => ({ ...prev, [client?._id]: true }));

    const id = eventId?._id;
    const data = {
      userId: client?._id,
      email: client?.email,
      type: "driver",
    };

    try {
      const response = await updateClientGroup({ data, id }).unwrap();
      
      message.success(response.message);
    } catch (error) {
      
      message.error(error?.data?.message);
    } finally {
      // Reset loading state for this specific client
      setLoadingStates((prev) => ({ ...prev, [client?._id]: false }));
    }
  };

 
  const drivers = eventId?.driver?.filter((ev) => ev.accept === false) || [];
  const clientGroups = clientData?.data?.filter(cln1 => 
    !eventId?.driver?.some(cln2 => {
      const isMatch = cln1?._id.toString() === cln2.userId?._id.toString(); 
      return isMatch;  
    })
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
          placeholder="Search Driver Volunteers"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="bg-white border lg:grid px-4 py-2 rounded w-full">
        <div className="">
        {clientGroups?.length > 0 ? (
          clientGroups?.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4 w-full">
              <Link to={`/clients/clientsDetails/${item?.id}`}>
                <h1 className="mt-2">
                  {item?.firstName}&#160;{item?.lastName}
                </h1>
              </Link>

              <button
                onClick={() => handleAddGroup(item)}
                className="border border-blue-900 text-blue-900 px-3 rounded-full text-sm flex items-center justify-center"
                disabled={loadingStates[item?._id]}
              >
                {loadingStates[item?._id] ? <Spin size="small" /> : "Add Driver"}
              </button>
            </div>
          ))
        ) : (
          <div className=" py-2"><NoData></NoData></div>
        )}
        </div>
      </div>
    </div>
  );
};