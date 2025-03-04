import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetSingleGroupClientDataQuery } from "../redux/api/clientApi";
import { Pagination } from "antd";

const ClientDeliveryDetailsPage = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const { id } = useParams();
  const { data: singleClientGroupData } = useGetSingleGroupClientDataQuery({ id , searchTerm:searchTerm ,  page: currentPage,
    limit: pageSize,}, { refetchOnMountOrArgChange: true }
  );
  
  const single = singleClientGroupData?.data?.result?.clients;
  

  const itemsPerPage = 10;

  const eventData = [
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address: "10009 Brookfield Drive",
      city: "Hallandele",
      zipCode: "11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address: "10009 Brookfield Drive",
      city: "Hallandele",
      zipCode: "11234",
      bags: "1",
    },
    {
      clientName: "Alena Molin",
      phone: "01694349873",
      alernatePhone: "988-3434-323",
      address: "10009 Brookfield Drive",
      city: "Hallandele",
      zipCode: "11234",
      bags: "1",
    },
  ];

  const totalItems = eventData.length;
  const currentEvents = eventData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    
    setCurrentPage(page);
  };


  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] lg:px-5 px-2 py-6">
        <h1 className="flex gap-1">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> Alena Armyeva
        </h1>

        <h1 className="text-2xl font-bold mt-3">Sunday Mitzvah Wee one</h1>
      </div>

      <div className="lg:px-5 px-2">
        <div className="flex items-center border-b py-6 border-gray-300 px-4 w-full mr-5">
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
            placeholder="Search Event"
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="lg:px-5 px-2 py-6">
        <div className="overflow-x-auto">
          <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Client Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">Phone #</th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Alternate Phone #
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">Address</th>
                <th className="px-4 py-2 text-left text-sm font-medium">City</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Zip Code</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Bags</th>
              </tr>
            </thead>
            <tbody>
              {single?.map((event, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 text-sm">
                    <Link to={`/clients/clientsDetails/${event?.id}`}>{event?.firstName} {event?.lastName}</Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{event?.phoneNo}</td>
                  <td className="px-4 py-3 text-sm">{event?.alternativePhoneNo}</td>
                  <td className="px-4 py-3 text-sm">{event?.address}</td>
                  <td className="px-4 py-3 text-sm">{event?.city}</td>
                  <td className="px-4 py-3 text-sm">{event?.zipCode}</td>
                  <td className="px-4 py-3 text-sm">{event?.badgeNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 px-4">
        <Pagination
         current={currentPage}
         pageSize={pageSize}
          total={singleClientGroupData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        </div>
      </div>
    </div>
  );
};

export default ClientDeliveryDetailsPage;
