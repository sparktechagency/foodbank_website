import React from "react";
import { Link } from "react-router-dom";

export const SearchWarehouseVolunteer = () => {
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
          placeholder="Search Warehouse Volunteers"
          className="ml-2 flex-1 outline-none bg-[#F6F7F9] text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="bg-white border lg:grid grid-cols-2 px-4 py-2 rounded">
        <div className="">
          {searchEventData.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <Link to={"/clients/clientsDetails"}>
                <h1 className="mt-2">{item.eventName}</h1>
              </Link>
              <button className="border border-blue-900  text-blue-900 px-3 rounded-full text-sm">
                {item.event}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
