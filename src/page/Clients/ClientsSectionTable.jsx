import { message, Modal, Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AddClientModal } from "./AddClientModal";
import { EditClienModalSec } from "./EditClienModalSec";
import { useDeleteClientMutation, useGetClientQuery } from "../redux/api/clientApi";

export const ClientsSectionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modal2Open, setModal2Open] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, client: null });
  const [deleteClient] = useDeleteClientMutation()
  const { data } = useGetClientQuery();
  console.log(data)
  const clientData = data?.data?.map((client) => ({
    id: client._id,
    clientName: `${client.firstName} ${client.lastName}`,
    phoneNo: client.phoneNo,
    alternativePhoneNo: client.alternativePhoneNo,
    holocaustSurvivor: client.holocaustSurvivor,
    badgeNumber: client.badgeNumber,
    clientDeliveryGroups: client.meetings.map((meeting) => meeting.clientGroupName),
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil((clientData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clientData?.slice(startIndex, endIndex) || [];

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleEdit = (client) => {
  console.log('client idc', client._id)
  
    console.log(client)
  
    setEditModal({
      isOpen: true,
      client, 
    });
  
  };

  const handleDelete = (id) => {
    console.log(id)
    Modal.confirm({
      title: "Are you sure you want to delete this volunteer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteClient(id).unwrap();
          message.success(response.message );
        } catch (error) {
          console.error("Error deleting volunteer:", error);
          message.error(error.data?.message );
        }
      },
    });
  };
  
  return (
    <div>
      <div className="mt-2 mb-5 lg:flex justify-between">
        {/* Search Box */}
        <div className="flex items-center py-3 border-b border-gray-300 px-1 w-full mr-5">
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
            placeholder="Search Clients"
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between mt-3 gap-3">
          {/* Filters */}
          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all client"
              options={[
                { value: "all client", label: "All Client" },
                { value: "Holocaust Survivors", label: "Holocaust Survivors" },
                { value: "Non-Holocaust Survivors", label: "Non-Holocaust Survivors" },
              ]}
            />
          </div>
          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all events"
              options={[
                { value: "all events", label: "Short By" },
                { value: "holiday drive", label: "Name" },
                { value: "mitzvah sunday", label: "Date" },
              ]}
            />
          </div>

          <div className="">
            <button
              onClick={() => setModal2Open(true)}
              className="w-[100px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              + Add Client
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {/* Table View */}
        <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">Client Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Alternate Phone #</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Holocaust Survivor</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Client Delivery Group</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Badge Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">
                  <Link to="/clients/clientsDetails">{client.clientName}</Link>
                </td>
                <td className="px-4 py-3 text-sm">{client.phoneNo}</td>
                <td className="px-4 py-3 text-sm">{client.alternativePhoneNo}</td>
                <td className="px-4 py-3 text-sm">{client.holocaustSurvivor}</td>
                <td className="px-4 py-3 text-sm">
                  {client.clientDeliveryGroups.join(", ") || "None"}
                </td>
                <td className="px-4 py-3 text-sm">{client.badgeNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                  <details className="dropdown">
                    <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                      <BiDotsVerticalRounded />
                    </summary>
                    <ul className="menu dropdown-content bg-white text-black rounded z-[1] right-0 w-44 p-2 shadow">
                      <li>
                        <a onClick={() => handleEdit(client)}>Edit</a>
                      </li>
                      <li>
                        <a onClick={() => handleDelete(client.id)}>Delete</a>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 px-4">
          <span className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, clientData?.length || 0)} of {clientData?.length || 0} items
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
      <AddClientModal
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
      ></AddClientModal>
      <EditClienModalSec
      isModalOpen={editModal.isOpen}
        setModal2Open1={setEditModal}
        client={editModal.client} 
      ></EditClienModalSec>
    </div>
  );
};
