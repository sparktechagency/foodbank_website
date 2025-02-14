import { message, Modal, Pagination, Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AddGroupModal } from "./AddGroupModal";
import { EditGroupModal } from "./EditGroupModal";
import { useGetVolunteersGroupQuery } from "../redux/api/volunteerApi";
import { useDeleteVolunteersGroupMutation } from "../redux/api/clientApi";
import { Loading } from "../../Basic/Loading";
import { ServerError } from "../../Basic/ServerError";

const Groups = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, group: null });
  const [searchTerm, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  const [types, setSortDriver] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage)
  const itemsPerPage = 10;
  const { data: volunteerGroup, isLoading, error } = useGetVolunteersGroupQuery({types,sortOrder:sortOrder,searchTerm:searchTerm,page: currentPage,
    limit: itemsPerPage,});
 console.log(volunteerGroup)
const [deleteVolunteerGroup] = useDeleteVolunteersGroupMutation()
  // Pagination
  const volunteers = volunteerGroup?.data
console.log(volunteerGroup?.meta?.total )

  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  if (error) {
    return <div><ServerError></ServerError></div>;
  }

 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (group) => {
    console.log("Editing Group:", group);
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
          const response = await deleteVolunteerGroup(id).unwrap();
          message.success(response.message );
        } catch (error) {
          console.error("Error deleting volunteer:", error);
          message.error(error.data?.message );
        }
      },
    });
  };
  const handleShortChange = (value) => {
    console.log(value);
    setSortOrder(value); // Update the selected filter type
  };

  const handleEventChange = (value) => {
    console.log("Selected Value:", value); // Debugging log
    setSortDriver(value); // Update state with selected value
  };

  return (
    <div>
      <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
        {/* Search Box */}
        <div className="flex items-center border-b py-3 border-gray-300 px-1 w-full mr-5">
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
            placeholder="Search Group"
            className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="mt-4 flex justify-between gap-3">
        <div>
            <Select
              className="w-full h-[42px]"
              placeholder="All Group"
              onChange={handleEventChange} // Updates holocaustSurvivor state
              options={[
                { value: 'driver', label: "Driver Volunteer Group" },
                { value: 'warehouse', label: "Warehouse Volunteer group" },
              ]}
            />
          </div>
          <div>
            <Select
              className="w-full h-[42px]"
              placeholder="Sort By"
              onChange={handleShortChange}
              options={[
                { value: "asc", label: "Sort By" },
                { value: "name", label: "Name" },
                { value: "desc", label: "Date" },
              ]}
            />
          </div>
          <div>
            <button
              onClick={() => setModal2Open(true)}
              className="w-[150px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              +Create Group
            </button>
          </div>
        </div>
      </div>

      <div className="lg:mx-5 mx-2">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Volunteer Group Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Volunteer Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                # of Volunteers
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((group) => (
              <tr key={group._id} className="bg-white">
                <td className="px-4 py-3 text-sm">
                  <Link to={`/group/details/${group._id}`}>
                    {group?.groupName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">
                  {group.types === "warehouse"
                    ? "Warehouse Volunteer"
                    : "Driver Volunteer"}
                </td>
                <td className="px-4 py-3 text-sm">{group.clients?.length}</td>
                <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                  <div className="dropdown">
                    <button className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                      <BiDotsVerticalRounded />
                    </button>
                    <div className="dropdown-content bg-white text-black rounded shadow z-[1] right-0 w-44 p-2">
                      <button
                        className="text-sm w-full text-left"
                        onClick={() => handleEdit(group)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm w-full text-left"
                        onClick={() => handleDelete(group._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={volunteerGroup?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        
      </div>

      

      <AddGroupModal
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
      />

      <EditGroupModal
        isModalOpen={editModal.isOpen}
        setModal2Open1={setEditModal}
        group={editModal.group}
      />
    </div>
  );
};

export default Groups;
