import React, { useState } from "react";
import { useDeleteEventGroupMutation } from "../../../page/redux/api/eventApi";
import { message, Pagination, Spin } from "antd";
import { useDeleteEventClientGroupMutation } from "../../../page/redux/api/clientApi";
import { Link } from "react-router-dom";

export const InvitedWarehouseVolunteers = ({ event }) => {
  const [removeEventGroup] = useDeleteEventGroupMutation();
  const [deleteEventClient] = useDeleteEventClientGroupMutation();
  const [groupPage, setGroupPage] = useState(1);
  const [volunteerPage, setVolunteerPage] = useState(1);

  // Track loading states for "Remove Group" buttons
  const [removeGroupLoading, setRemoveGroupLoading] = useState({});

  // Track loading states for "Remove Volunteer" butto
  const [removeVolunteerLoading, setRemoveVolunteerLoading] = useState({});

  const groups = event?.groups?.filter((data) => data?.type === "warehouse") || [];
  const volunteers = event?.warehouse || [];

  const itemsPerPage = 4;

  // Pagination handlers
  const handleGroupPageChange = (page) => {
    setGroupPage(page);
  };

  const handleVolunteerPageChange = (page) => {
    setVolunteerPage(page);
  };

  // Slice data for pagination
  const paginatedGroups = groups.slice((groupPage - 1) * itemsPerPage, groupPage * itemsPerPage);
  const paginatedVolunteers = volunteers.slice((volunteerPage - 1) * itemsPerPage, volunteerPage * itemsPerPage);

  const handleRemoveGroup = async (groupId) => {
    setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: true }));
    const data = { groupId, eventId: event?._id, types: "warehouse" };

    try {
      const response = await removeEventGroup(data).unwrap();
      message.success(response.message);
    } catch (error) {
      message.error("Failed to remove group from the event.");
    } finally {
      setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  const handleRemoveEventGroup = async (email) => {
    setRemoveVolunteerLoading((prev) => ({ ...prev, [email]: true }));
    const data = { email, type: "warehouse" };

    try {
      const response = await deleteEventClient({ id: event?._id, data }).unwrap();
      message.success(response.message);
    } catch (error) {
      message.error("Failed to remove volunteer from the event.");
    } finally {
      setRemoveVolunteerLoading((prev) => ({ ...prev, [email]: false }));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="font-semibold">Invite Warehouse Volunteers</h1>
          <p className="mt-2 mb-1">Warehouse Volunteers Group</p>
        </div>
      </div>

      <div className="lg:grid grid-cols-2 gap-4">
        {/* Warehouse Groups Section */}
        <div className="bg-white border px-4 py-2 rounded">
          {paginatedGroups.map((item, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <h1 className="mt-2">{item.gid.groupName}</h1>
              <button
                onClick={() => handleRemoveGroup(item.gid._id)}
                className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                disabled={removeGroupLoading[item.gid._id]}
              >
                {removeGroupLoading[item.gid._id] ? <Spin size="small" /> : "Remove"}
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Pagination
              current={groupPage}
              pageSize={itemsPerPage}
              total={groups.length}
              onChange={handleGroupPageChange}
              showSizeChanger={false}
            />
          </div>
        </div>

        {/* Warehouse Volunteers Added to Event Section */}
        <div className="bg-white px-4 border py-2 rounded">
          {paginatedVolunteers.map((ev, index) => (
            <div key={index} className="flex justify-between space-y-4">
              <Link to={`/clients/clientsDetails/${ev?.userId?._id}`}>
                <h1 className="mt-2">
                  {ev?.userId?.firstName} {ev?.userId?.lastName}
                </h1>
              </Link>
              <button
                onClick={() => handleRemoveEventGroup(ev?.email)}
                className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                disabled={removeVolunteerLoading[ev?.email]}
              >
                {removeVolunteerLoading[ev?.email] ? <Spin size="small" /> : "Remove"}
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Pagination
              current={volunteerPage}
              pageSize={itemsPerPage}
              total={volunteers.length}
              onChange={handleVolunteerPageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
