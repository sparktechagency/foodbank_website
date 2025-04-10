import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward, IoIosTimer, IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message, Pagination, Dropdown, Menu } from "antd"; 
import { useState, useEffect } from "react";
import { useGetSingleEventGroupQuery, useUpdateClientStatusMutation } from "../../page/redux/api/eventApi";
import axios from 'axios';
 

const ConfirmedClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: singleClientData, isLoading, isError, refetch } = useGetSingleEventGroupQuery(
        { id }, { refetchOnMountOrArgChange: true }
    );


    const event = singleClientData?.data?.event;
    const clients = event?.client || [];

    
    const paginatedClients = clients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleClientPageChange = (page) => {
        setCurrentPage(page);
    };

    
    const [updateClientStatus, { isLoading: isUpdating }] = useUpdateClientStatusMutation();

    const handleUpdateStatus = async (clientId, status) => {
        try {
         
          
            await updateClientStatus({ eventId: id, clientId, confirmed: status }).unwrap();
            refetch();
            message.success("Client status updated successfully!");
        } catch (error) {
            message.error("Failed to update status");
        }
    };

    const getDropdownMenu = (clientId) => (
        <Menu onClick={({ key }) => handleUpdateStatus(clientId, key)}>
            <Menu.Item key="Not-Called">Not Called</Menu.Item>
            <Menu.Item key="Confirmed">Confirmed</Menu.Item>
            <Menu.Item key="Unable-to-Reach">Unable to Reach</Menu.Item>
            <Menu.Item key="Rescheduled">Rescheduled</Menu.Item>
            <Menu.Item key="Skip-Month">Skip Month</Menu.Item>
        </Menu>
    );

    return (
        <div className="min-h-screen">
            <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
                <div className="lg:px-5 px-2 py-6">
                    <div className="flex justify-between items-center pb-4">
                        <h2 className="text-lg font-semibold">Confirmed Clients</h2>
                         
                           <p> Total Clients: {clients.length}</p>
                         
                    </div>

                    <div className="overflow-x-auto">
                        <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left text-sm font-medium">First Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Last Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Address</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Phone #</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Alternate Phone #</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Holocaust Survivor</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Confirmed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedClients.map((client, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <td className="px-4 py-3 text-sm">
                                            <Link to={`/clients/clientsDetails/${client?.userId?.id}`}>
                                                {client?.userId?.firstName}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <Link to={`/clients/clientsDetails/${client?.userId?.id}`}>
                                                {client?.userId?.lastName}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{client?.userId?.address}</td>
                                        <td className="px-4 py-3 text-sm">{client?.userId?.phoneNo}</td>
                                        <td className="px-4 py-3 text-sm">{client?.userId?.alternativePhoneNo}</td>
                                        <td className="px-4 py-3 text-sm">{client?.userId?.badgeNumber}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <Dropdown overlay={getDropdownMenu(client?.userId?.id)} trigger={["click"]}>
                                                <div className="cursor-pointer bg-[#EDEDED] px-3 py-1 rounded-full flex items-center justify-between w-[180px]">
                                                    <span>{client?.confirmed || 'Not Called'}</span> <IoIosArrowDown />
                                                </div>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end items-center mt-4 px-4">
                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={clients.length || 0}
                            onChange={handleClientPageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedClient;
