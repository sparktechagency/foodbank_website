import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDeleteEventGroupMutation, useUpdateSuccessConfirmMutation, useUpdateSuccessQuery } from "../../../page/redux/api/eventApi";
import { message, Pagination, Spin } from "antd"; // Import Spin for loading indicator
import { useDeleteEventClientGroupMutation } from "../../../page/redux/api/clientApi";
import { Link } from "react-router-dom";
import { NoData } from "../../../Basic/NoData";

export const InviteDriverVolunteers = ({ event }) => {
  const [groupPage, setGroupPage] = useState(1);
  const [driverPage, setDriverPage] = useState(1);
  const [removeEventGroup] = useDeleteEventGroupMutation();
  const [deleteEventClient] = useDeleteEventClientGroupMutation();

  // Track loading states for "Remove Group" buttons
  const [removeGroupLoading, setRemoveGroupLoading] = useState({});
  
  // Track loading states for "Remove Driver" buttons
  const [removeDriverLoading, setRemoveDriverLoading] = useState({});

  const groups = event?.groups?.filter((data) => data?.type === "driver") || [];
  const drivers = event?.driver?.filter((ev) => ev.accept === false) || [];

  const itemsPerPage = 10;

  // Pagination handlers
  const handleGroupPageChange = (page) => {
    setGroupPage(page);
  };

  const handleDriverPageChange = (page) => {
    setDriverPage(page);
  };

  // Slice data for pagination
  const paginatedGroups = groups.slice((groupPage - 1) * itemsPerPage, groupPage * itemsPerPage);
  const paginatedDrivers = drivers.slice((driverPage - 1) * itemsPerPage, driverPage * itemsPerPage);

  const handleRemoveGroup = async (groupId) => {
    setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: true }));
    const data = { groupId, eventId: event?._id, types: "driver" };

    try {
      const response = await removeEventGroup(data).unwrap();
      message.success(response.message);
    } catch (error) {
      message.error("Failed to remove group from the event.");
    } finally {
      setRemoveGroupLoading((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  const handleRemoveEventGroup = async (driver) => {
    // console.log("driver.v2", driver)
    setRemoveDriverLoading((prev) => ({ ...prev, [driver.email]: true }));
    const data = { email: driver.email, type: "driver", driver: driver?.userId?._id }; 
    try {
      const response = await deleteEventClient({ id: event?._id, data }).unwrap();
      message.success(response.message);
    } catch (error) {
      message.error("Failed to remove driver from the event.");
    } finally {
      setRemoveDriverLoading((prev) => ({ ...prev, [driver.email]: false }));
    }
  };


  const [updateSuccess, { isLoading }] = useUpdateSuccessConfirmMutation();;
 
 
  const handleConfirmButton = async (user) => { 
    const type= "driver"; 
    const eventId = event?._id; 
    const userId = user?.userId?._id;
    const from = "admin"
    if (!userId || !eventId) {
      message.error("Missing required parameters.");
      return;
    } 

    try {
      const response = await updateSuccess({ eventId, type, userId, from}).unwrap();
      console.log("=========", response)
      message.success(response.message);
    } catch (error) {
      console.error("Error confirming driver:", error);
      message.error(error.data.message || "Failed to confirm driver.");
    }
}; 

    const handleDelete = (id) => {
      Modal.confirm({
        title: "Are you sure you want to delete event?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          try {
            const response = await deleteEvent(id).unwrap();
            message.success(response?.message);
          } catch (error) {
            message.error(error?.data?.message);
          }
        },
      });
    };

  return (
    <div>
      <div className="">
      <h1 className="font-semibold">Invite Driver Volunteers</h1>
      </div>

      <div className="lg:grid grid-cols-2 gap-4">
        {/* Driver Groups Section */}
        
        <div>
        <div>
         
          <p className="mt-2 mb-1">Driver Volunteers Group</p>
        </div>
        <div className="bg-white border px-4 py-2 rounded">
        {paginatedGroups?.length > 0 ? (
              paginatedGroups?.map((item, index) => (
                <div key={index} className="flex justify-between space-y-4">
                  <Link to={`/group/details/${item?.gid?._id}`}>
                    <h1 className="mt-2">{item?.gid?.groupName}</h1>
                  </Link>
                  <button
                    onClick={() => handleRemoveGroup(item?.gid?._id)}
                    className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                    disabled={removeGroupLoading[item?.gid?._id]}
                  >
                    {removeGroupLoading[item?.gid?._id] ? <Spin size="small" /> : "Remove"}
                  </button>
                </div>
              ))
            ) : (
              <div className=" py-2"><NoData></NoData></div>
            )}
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
        </div>

        {/* Drivers Added to Event Section */}
        <div>
        <p className="mt-2 mb-1">Driver Volunteers Requested</p>
        <div className="bg-white px-4 border py-2 rounded">
        {paginatedDrivers?.length > 0 ? (
              paginatedDrivers?.map((ev, index) => (
                <div key={index} className="flex justify-between space-y-4">
                  <Link to={`/clients/clientsDetails/${ev?.userId?._id}`}>
                    <h1 className="mt-2">{ev?.userId?.firstName} {ev?.userId?.lastName}</h1>
                  </Link>
                  <div className="flex gap-2"> 
                    <button onClick={(data)=> handleConfirmButton(ev)} className="border px-4 rounded-full"> {isLoading?<Spin size="small" /> :"Confirmed"}</button>
                  <button
                    onClick={() => handleRemoveEventGroup(ev)}
                    className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center justify-center"
                    disabled={removeDriverLoading[ev?.email]}
                  >
                    {removeDriverLoading[ev?.email] ? <Spin size="small" /> : "Remove"}
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <div className=" py-2"><NoData></NoData></div>
            )}
          <div className="mt-4 flex justify-end">
            <Pagination
              current={driverPage}
              pageSize={itemsPerPage}
              total={drivers.length}
              onChange={handleDriverPageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
