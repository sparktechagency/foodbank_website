import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { useGetSingleGroupVolunteerQuery } from "../redux/api/volunteerApi";

const VolunteerGroupDetails = () => {
  const { id } = useParams();
  const { data: singleGroupData } = useGetSingleGroupVolunteerQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );


  const volunteers = singleGroupData?.data?.result?.clients || [];


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(volunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVolunteers = volunteers.slice(startIndex, endIndex);

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
    <div className="">
      <div className="bg-[#FAFAFA] lg:px-5 px-2 lg:pt-10 pt-3 pb-5">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Volunteer Groups</span>{" "}
          <IoIosArrowForward className="mt-1" /> {singleGroupData?.data?.volunteerGroupName}
        </h1>

        <h1 className="text-2xl font-bold mt-3">
          {singleGroupData?.data?.volunteerGroupName}
        </h1>
      </div>

      <div className="lg:mx-5 mx-2 overflow-x-auto">
        <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">Volunteer Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone #</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Vip</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Volunteer Type</th>
            </tr>
          </thead>
          <tbody>
            {currentVolunteers?.map((volunteer, index) => (
              <tr
                key={volunteer?._id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">
                  <Link to={`/volunteers/details/${volunteer?._id}`}>{volunteer?.firstName} {volunteer?.lastName}</Link>
                </td>
                <td className="px-4 py-3 text-sm">{volunteer?.phoneNo}</td>
                <td className="px-4 py-3 text-sm">{volunteer?.email}</td>
                <td className="px-4 py-3 text-sm">
                  {volunteer?.volunteerType ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-sm">{volunteer?.volunteerRole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, volunteers?.length)} of{" "}
          {volunteers?.length} items
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGroupDetails;
