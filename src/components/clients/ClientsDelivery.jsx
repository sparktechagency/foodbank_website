import { message, Modal, Pagination, Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AddModalClientDeliveriGroup } from "./AddModalClientDeliveriGroup";
import { EditClientDeliveryGroup } from "./EditClientDeliveryGroup";
import { useDeleteClientGroupMutation, useGetClientGroupQuery } from "../../page/redux/api/clientApi";
import { Loading } from "../../Basic/Loading";

const ClientsDelivery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: clientGroup, isLoading, error } = useGetClientGroupQuery({searchTerm, sortOrder:sortOrder});
    
  const [deleteClientGroup] = useDeleteClientGroupMutation()
  
 if (isLoading) {
     return <p><Loading></Loading></p>;
   }
 
   if (error) {
     return <p>Failed to load client groups.</p>;
   }
 

  const handleEdit = (group) => {
    console.log(group)
    setEditModal({
      isOpen: true,
      group, 
    });
  };


  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this volunteer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteClientGroup(id).unwrap();
          message.success(response.message );
        } catch (error) {
          console.error("Error deleting volunteer:", error);
          message.error(error.data?.message );
        }
      },
    });
  };
  
  const handleShortChange = (value) => {
    console.log(value)
    setSortOrder(value); // Update the selected filter type
  };

  const handlePageChange = (page) => {
    console.log("Page Changed to:", page); // Debug to confirm `page` is received
    setCurrentPage(page);
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
          onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Clients"
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between mt-3 gap-3 ">
          {/* Filters */}
          
          <div>
          <Select
              className="w-full h-[42px]"
              placeholder='Short By'
              onChange={handleShortChange}
              options={[
                { value: "asc", label: "Short By" },
                { value: "desc", label: "Date" },
              ]}
            />
          </div>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="w-[160px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              + Create Group
            </button>
          </div>
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium">
              Client Delivery Group
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              # of Clients
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {clientGroup?.data?.map((group) => (
            <tr
              key={group._id}
              className={`${group._id % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-3 text-sm">
                <Link to={`/clients/ClientDeliveryDetailsPage/${group._id}`}>
                  {group.groupName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{group.clients.length}</td>
              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <details className="dropdown">
                  <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                    <BiDotsVerticalRounded />
                  </summary>
                  <ul className="menu dropdown-content bg-white text-black rounded z-30 right-0 w-44 p-2 shadow">
                    <li>
                      <a onClick={() => handleEdit(group)}>Edit</a>
                    </li>
                    <li>
                      <a onClick={() => handleDelete(group.id)}>Delete</a>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     

      <AddModalClientDeliveriGroup
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <EditClientDeliveryGroup
        isModalOpen={editModal.isOpen}
        setEditModal={setEditModal}
        group={editModal.group} 
      />
    </div>
  );
};

export default ClientsDelivery;
