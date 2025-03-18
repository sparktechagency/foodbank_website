import { message, Modal, Select, Pagination, Dropdown, Menu } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AddClientModal } from "./AddClientModal";
import { EditClienModalSec } from "./EditClienModalSec";
import {
  useDeleteClientMutation,
  useGetClientQuery,
} from "../redux/api/clientApi";
import { Loading } from "../../Basic/Loading";
import { IoIosArrowDown } from "react-icons/io";
import { ServerError } from "../../Basic/ServerError";

export const ClientsSectionTable = () => {
  const [searchTerm, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [editModal, setEditModal] = useState({ isOpen: false, client: null });
  const itemsPerPage = 10;
  const [holocaustSurvivor, setHolocaustSurvivor] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { data, isLoading, error } = useGetClientQuery({
    searchTerm,
    holocaustSurvivor,
    sortOrder,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteClient] = useDeleteClientMutation();

  const clientData = data?.data?.map((client) => ({
    id: client?._id,
    clientName: `${client?.firstName} ${client?.lastName}`,
    phoneNo: client?.phoneNo,
    alternativePhoneNo: client?.alternativePhoneNo,
    holocaustSurvivor: client?.holocaustSurvivor,
    badgeNumber: client?.badgeNumber,
    clientDeliveryGroups: client?.meetings?.map(
      (meeting) => meeting?.clientGroupName
    ),
  }));

  const totalClients = clientData?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients =
    clientData?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handleEdit = (client) => {
    setEditModal({
      isOpen: true,
      client,
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this client?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteClient(id).unwrap();
          message.success(response?.message);
        } catch (error) {
          message.error(error?.data?.message);
        }
      },
    });
  };

  const handleShortChange = (value) => {
    setSortOrder(value); // Update the selected filter type
  };

  const handleEventChange = (value) => {
    setHolocaustSurvivor(value); // Update state with selected value
  };

  if (isLoading) {
    return (
      <p>
        <Loading></Loading>
      </p>
    );
  }

  if (error) {
    return (
      <div>
        <ServerError></ServerError>
      </div>
    );
  }

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

        <div className="flex justify-between mt-3 gap-3">
          {/* Filters */}
          <div>
            <Select
              className="w-full h-[42px]"
              placeholder="All Clients"
              onChange={handleEventChange} // Updates holocaustSurvivor state
              options={[
                { value: true, label: "Holocaust Survivors" },
                { value: false, label: "Non-Holocaust Survivors" },
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
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Alternate Phone #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Holocaust Survivor
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Delivery Group
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Number of Bags
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((client, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">
                  <Link to={`/clients/clientsDetails/${client?.id}`}>
                    {client?.firstName} {client?.lastName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">{client?.phoneNo}</td>
                <td className="px-4 py-3 text-sm">
                  {client?.alternativePhoneNo || "No Number"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {client?.holocaustSurvivor ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {client?.meetings?.length > 0 ? (
                    <Dropdown
                      overlay={
                        <Menu
                          items={client?.meetings.map((meeting) => ({
                            key: meeting?._id,
                            label: meeting?.groupName,
                          }))}
                        />
                      }
                      trigger={["click"]}
                    >
                      <div className="cursor-pointer bg-[#EDEDED] px-3 py-1 rounded-full flex items-center justify-between">
                        {client?.meetings?.length} Groups
                        <IoIosArrowDown />
                      </div>
                    </Dropdown>
                  ) : (
                    "No Groups"
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{client?.badgeNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                  {/* <details className="dropdown">
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
                  </details> */}

                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            key: "1",
                            label: "Edit",
                            onClick: () => handleEdit(client),
                          },
                          {
                            key: "2",
                            label: "Delete",
                            onClick: () => handleDelete(client._id),
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
        {/* Ant Design Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
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
