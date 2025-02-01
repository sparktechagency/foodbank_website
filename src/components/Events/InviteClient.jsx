import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDeleteEventGroupMutation } from "../../page/redux/api/eventApi";
import { message, Pagination, Spin } from "antd"; // Import Spin for loading indicator
import { useDeleteEventClientGroupMutation } from "../../page/redux/api/clientApi";
import { NoData } from "../../Basic/NoData";

export const InviteClient = ({ event }) => {
  console.log(event);
  const [groupPage, setGroupPage] = useState(1);
  const [clientPage, setClientPage] = useState(1);
  const [removeEventGroup] = useDeleteEventGroupMutation();
  const [deleteEventClient] = useDeleteEventClientGroupMutation();

  // Track loading states for "Remove Group" buttons
  const [removeGroupLoading, setRemoveGroupLoading] = useState({});

  // Track loading states for "Remove Client" buttons
  const [removeClientLoading, setRemoveClientLoading] = useState({});

  const itemsPerPage = 5;

  // Pagination handlers
  const handleGroupPageChange = (page) => {
    setGroupPage(page);
  };

  const handleClientPageChange = (page) => {
    setClientPage(page);
  };

  // Handle removing a group
  const handleRemoveGroup = async (groupId) => {
    setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: true }));
    const data = { groupId, eventId: event?._id, types: "client" };
    try {
      const response = await removeEventGroup(data).unwrap();
      console.log("Group successfully removed from event:", response);
      message.success(response.message);
    } catch (error) {
      console.error("Error removing group from event:", error);
      message.error("Failed to remove group from the event.");
    } finally {
      setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  // Handle removing a client
  const handleRemoveEventGroup = async (email) => {
    setRemoveClientLoading((prev) => ({ ...prev, [email]: true }));
    const data = { email, type: "client" };
    try {
      const response = await deleteEventClient({
        id: event?._id,
        data,
      }).unwrap();
      console.log("Client successfully removed from event:", response);
      message.success(response.message);
    } catch (error) {
      console.error("Error removing client from event:", error);
      message.error("Failed to remove client from the event.");
    } finally {
      setRemoveClientLoading((prev) => ({ ...prev, [email]: false }));
    }
  };

  const groups = event?.groups?.filter((data) => data?.type === "client") || [];
  const clients = event?.client || [];

  // Slice data for pagination
  const paginatedGroups = groups.slice(
    (groupPage - 1) * itemsPerPage,
    groupPage * itemsPerPage
  );
  const paginatedClients = clients.slice(
    (clientPage - 1) * itemsPerPage,
    clientPage * itemsPerPage
  );

  return (
    <div>
      <div className="">
      <h1 className="font-semibold">Invite Clients</h1>
      </div>

      <div className="lg:grid grid-cols-2 gap-4">
        {/* Client Groups Section */}
        <div>
        <div>
          
          <p className="mt-2 mb-1">Client Groups</p>
        </div>
          <div className="bg-white border px-4 py-2 rounded">
            {paginatedGroups.length > 0 ? (
              paginatedGroups.map((item, index) => (
                <div key={index} className="flex justify-between space-y-4">
                  <Link
                    to={`/clients/ClientDeliveryDetailsPage/${item.gid._id}`}
                  >
                    <h1 className="mt-2">{item.gid.groupName}</h1>
                  </Link>
                  <button
                    onClick={() => handleRemoveGroup(item.gid._id)}
                    className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                    disabled={removeGroupLoading[item.gid._id]}
                  >
                    {removeGroupLoading[item.gid._id] ? (
                      <Spin size="small" />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className=" py-2  ">
                <NoData></NoData>
              </p>
            )}
            {groups.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Pagination
                  current={groupPage}
                  pageSize={itemsPerPage}
                  total={groups.length}
                  onChange={handleGroupPageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Clients Added to Event Section */}
        <div className="">
          <p className="mt-2 mb-1">Clients Added to Event</p>
          <div className="bg-white px-4 border py-2 rounded">
            {paginatedClients.length > 0 ? (
              paginatedClients.map((ev, index) => (
                <div key={index} className="flex justify-between space-y-4">
                  <Link to={`/clients/clientsDetails/${ev?.userId?.id}`}>
                    <h1 className="mt-2">
                      {ev?.userId?.firstName} {ev?.userId?.lastName}
                    </h1>
                  </Link>
                  <button
                    onClick={() => handleRemoveEventGroup(ev.userId.email)}
                    className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                    disabled={removeClientLoading[ev.userId.email]}
                  >
                    {removeClientLoading[ev.userId.email] ? (
                      <Spin className="text-white" size="small" />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className=" py-2  ">
                <NoData></NoData>
              </p>
            )}
            {clients.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Pagination
                  current={clientPage}
                  pageSize={itemsPerPage}
                  total={clients.length}
                  onChange={handleClientPageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
