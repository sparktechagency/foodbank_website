import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddClientGroupMutation,
  useGetGroupClientQuery,
} from "../../../page/redux/api/clientApi";
import { useGetWarehouseEventQuery, useGetWarehouseQuery } from "../../../page/redux/api/volunteerApi";
import { message, Spin } from "antd";
import { NoData } from "../../../Basic/NoData";

export const SearchWarehouseVolunteer = ({eventId}) => {
  console.log("warehouise,", eventId)
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearch] = useState("");
  const { data: clientData } = useGetWarehouseEventQuery({searchTerm});
  const [updateClientGroup] = useAddClientGroupMutation();
  

  const handleAddGroup = async (client) => {
    console.log(client.email)
    const id = eventId._id
    console.log(id)
    const data = {
      userId: client._id,
      email: client.email,
      type: "warehouse",
    };
    console.log(data)
    setLoadingStates((prev) => ({ ...prev, [client._id]: true }));
    try {
      const response = await updateClientGroup({ data ,id}).unwrap();
      console.log("Group successfully added to event:", response);
      message.success(response.message);
     
    } catch (error) {
      console.error("Error adding group to event:", error);
      message.error(error?.data?.message);
    }
    setLoadingStates((prev) => ({ ...prev, [client._id]: false }));
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
          placeholder="Search Warehouse Volunteers"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="bg-white border lg:grid grid-cols-2 px-4 py-2 rounded">
        <div className="">
        {clientData?.data?.length > 0 ? (
          clientData.data.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <Link to={`/clients/clientsDetails/${item.id}`}>
                <h1 className="mt-2">
                  {item.firstName}&nbsp;
                  {item.lastName}
                </h1>
              </Link>
              <button
                onClick={() => handleAddGroup(item)}
                className="border border-blue-900 text-blue-900 px-3 rounded-full text-sm"
                disabled={loadingStates[item._id]}
              >
                {loadingStates[item._id] ? <Spin size="small" /> : "Add Client"}
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
