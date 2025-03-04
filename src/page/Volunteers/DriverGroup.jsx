import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {

  IoIosArrowDown,
  
} from "react-icons/io";
import { Link } from "react-router-dom";
import { Dropdown, Menu, message, Modal, Pagination, Select } from "antd";
import { useGetWarehouseQuery } from "../redux/api/volunteerApi";

import { useDeleteWarehouseMutation } from "../redux/api/clientApi";
import { AddWarehouse } from "./AddWarehouse";
import { EditWarehouse } from "./EditWarehouse";
import { Loading } from "../../Basic/Loading";
import { ServerError } from "../../Basic/ServerError";

const DriverGroup = () => {
  const [searchTerm, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: allVolunteerData, isLoading, error } = useGetWarehouseQuery({searchTerm,sortOrder:sortOrder, page: currentPage,
    limit: itemsPerPage,});
  const [modal2Open, setModal2Open] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, client: null });
  const [deleteDriver] = useDeleteWarehouseMutation()
  
  const volunteers = allVolunteerData?.data
 
  if (isLoading) {
    return <div><Loading></Loading></div>;
  }

  if (error) {
    return <div><ServerError></ServerError></div>;
  }

  

  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleEdit = (volunteer) => {
  
    setEditModal({
      isOpen: true,
      client: volunteer, 
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
          const response = await deleteDriver(id).unwrap();
          message.success(response.message );
        } catch (error) {
    
          message.error(error.data?.message );
        }
      },
    });
  };
  const handleShortChange = (value) => {

    setSortOrder(value); 
  };



  return (
    <div>
    <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
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
          placeholder="Search Volunteers"
          className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="mt-4 flex justify-end gap-3">
      <div>
            <Select
              className="w-full h-[42px]"
              placeholder="Sort By"
              onChange={handleShortChange}
              options={[
                { value: "asc", label: "Sort By" },
                { value: "name", label: "Name" },
                { value: "desc", label: "Date" },
                { value: "vip", label: "Vip" },
              ]}
            />
          </div>
        <div>
          <button
            onClick={() => setModal2Open(true)}
            className="w-[160px] bg-[#234E6F] rounded-full py-2 text-white"
          >
            +Add Warehouse
          </button>
        </div>
      </div>
    </div>

    <div className="lg:mx-5 mx-2 overflow-x-auto">
      <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Phone #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Vip</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Groups
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr
              key={volunteer._id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-3 text-sm">
                <Link to={`/volunteers/details/${volunteer._id}`}>
                  {volunteer.firstName} {volunteer.lastName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{volunteer.phoneNo}</td>
              <td className="px-4 py-3 text-sm">{volunteer.email}</td>
              <td className="px-4 py-3 text-sm">
                {volunteer.volunteerType ? "Yes" : "No"}
              </td>
              <td className="px-4 py-3 text-sm">
                {volunteer.volunteerRole === 'driver'
                  ? "Driver Volunteer"
                  : "Warehouse Volunteer"}
              </td>
              <td className="px-4 py-3 text-sm">
                {volunteer.meetings.length > 0 ? (
                  <Dropdown
                    overlay={
                      <Menu
                        items={volunteer.meetings.map((meeting) => ({
                          key: meeting._id,
                          label: meeting.groupName,
                        }))}
                      />
                    }
                    trigger={["click"]}
                  >
                    <div className="cursor-pointer bg-[#EDEDED] px-3 py-1 rounded-full flex items-center justify-between">
                      {volunteer.meetings.length} Groups <IoIosArrowDown />
                    </div>
                  </Dropdown>
                ) : (
                  "No Groups"
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          key: "1",
                          label: "Edit",
                          onClick: () => handleEdit(volunteer), // Pass volunteer to handleEdit
                        },
                        {
                          key: "2",
                          label: "Delete",
                          onClick: () => handleDelete(volunteer._id),
                        },
                      ]}
                    />
                  }
                  trigger={["click"]}
                >
                  <BiDotsVerticalRounded className="cursor-pointer" />
                </Dropdown>
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
          total={allVolunteerData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        
      </div>
   

    <AddWarehouse
      setModal2Open={setModal2Open}
      modal2Open={modal2Open}
    />
    <EditWarehouse
      isModalOpen={editModal.isOpen}
      setModal2Open1={setEditModal}
      client={editModal.client}
    />
  </div>
  );
};

export default DriverGroup;
