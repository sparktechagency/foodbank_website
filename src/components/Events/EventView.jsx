import { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
  useGetSingleEventGroupQuery,
  useGetSingleVolunteerAssignedQuery,
  useUpdateAssignedMutation,
} from "../../page/redux/api/eventApi";
import { CloudLightning } from "lucide-react";
import { Button } from "antd";

const EventView = () => {
  const { eventId, volunteerId } = useParams();
  
  

  const {
    data: singleClientData,
    isLoading,
    isError,
  } = useGetSingleEventGroupQuery(
    { id: eventId },
    { refetchOnMountOrArgChange: true }
  );

  

  const { data: singleVolunteerData } = useGetSingleVolunteerAssignedQuery(
    { id: volunteerId },
    { refetchOnMountOrArgChange: true }
  );

  const [updateAssigned, { isLoading: isUpdating }] = useUpdateAssignedMutation();

  

  const volunteer = singleVolunteerData?.data;
 

 
  const client = singleClientData?.data?.event?.client;
  
  const assignedDate = client&&client.filter((c)=> c.assigned===true)

  const event = singleClientData?.data?.event;
 
  const totalSpotsFilled = event?.warehouse.length + event?.driver.length;
  const warehouseNeeded = event?.warehouseNeeded;

  const dayOfEvent = event?.dayOfEvent
    ? new Date(event.dayOfEvent).toLocaleDateString()
    : "Unknown Date";
  const time =
    event?.startOfEvent && event?.endOfEvent
      ? `${event.startOfEvent} - ${event.endOfEvent}`
      : "Unknown Time";

 



      const [loading, setLoading] = useState({});

      // Toggle assign button functionality
      const toggleAssign = async (index) => {
        const data = {
          eventId: eventId,
          volunteerId: volunteerId,
          clientId: index?.userId?._id,
        };
      
        // Set loading state for this button
        setLoading((prev) => ({ ...prev, [index._id]: true }));
      
        try {

          const res = await updateAssigned(data).unwrap();
          if(res.success){
            setLoading((prev) => ({ ...prev, [index._id]: false }));
          }
          console.log('asdfasdf',res);
  
          
        } catch (error) {
          console.error(error);
          setLoading((prev) => ({ ...prev, [index._id]: false }));
        }
      };
    
      console.log('volunteerId',volunteerId);
      console.log('client',client)

      const totalAssiendedNumber = client&& client?.filter(clt => 
        clt?.assignedUId?._id.toString()===volunteerId.toString()

      )
      console.log(totalAssiendedNumber)

  return (
    <div className="min-h-screen">
      <div className="lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1">
          <span className="text-[#007AFF]">{event?.eventName}</span>{" "}
          <IoIosArrowForward className="mt-1" /> {volunteer?.firstName}{" "}
          {volunteer?.lastName} {totalSpotsFilled}/{warehouseNeeded}
        </h1>

        <div className="lg:flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mt-3">{event?.eventName}</h1>
            <div className="lg:flex lg:gap-5 mt-3 ">
              <span className="flex">
                <IoIosTimer className="lg:text-xl text-sm mt-[3px] mr-1" />
                {dayOfEvent}, {time}
              </span>
              <span className="hidden lg:block">|</span>
              <span className="flex">
                <CiLocationOn className="lg:text-xl text-sm mt-[3px] mr-1" />
                {event?.location}
              </span>
            </div>
            {/* <div className="flex gap-5 mt-3">
              <span className="flex">{event?.messageDeliveryDriver}</span>
              <span>|</span>
              <span>{event?.messageWarehouseVolunteer}</span>
            </div> */}
          </div>
          <div className="lg:flex gap-3 mt-3 lg-mt-0">
            <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg">
                <p>Total Assigned : {volunteer?.firstName}{" "}
                {volunteer?.lastName}</p>
                <h1 className="text-xl font-semibold">{totalAssiendedNumber?.length||0}</h1>
              </div>
            </div>
            <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg my-3 lg:my-0">
                <p>Client Assigned</p>
                <h1 className="text-xl font-semibold">{assignedDate?.length}/{client?.length}</h1>
              </div>
            </div>
            {/* <div>
              <div className="bg-[#E3F5FF] p-4 rounded-lg">
                <p>Preferred Delivery Location</p>
                <h1 className="text-xl font-semibold">Hallandale</h1>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="lg:mx-5 mx-2 overflow-x-auto">
        <table className="lg:w-full w-[1000px] border-collapse mt-6 border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Client Name
              </th>
              {/* <th className="px-4 py-2 text-left text-sm font-medium">
                Assigned Volunteer
              </th> */}
              <th className="px-4 py-2 text-left text-sm font-medium">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">City</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Holocaust Survivor
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                # of Bags
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Clients
              </th>
            </tr>
          </thead>
          <tbody>
            {client?.map((clients, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">
                  {clients?.userId?.firstName} {clients?.userId?.lastName}{" "}
                </td>
                {/* <td className="px-4 py-3 text-sm">
                  {clients?.assignedUId
                    ? `${clients?.assignedUId?.firstName} ${clients?.assignedUId?.lastName}`
                    : "No Assigned"}
                </td> */}

                <td className="px-4 py-3 text-sm">
                  {clients?.userId?.address}
                </td>
                <td className="px-4 py-3 text-sm">{clients?.userId?.city}</td>
                <td className="px-4 py-3 text-sm">
                  {clients?.userId?.holocaustSurvivor ? "Yes" : "No"}
                </td>

                <td className="px-4 py-3 text-sm">
                  {clients?.userId?.badgeNumber}
                </td>
                <td className="px-4 py-3 text-sm">
                <Button
                    onClick={() => toggleAssign(clients)}
                    loading={loading[clients?._id]} // Show loading spinner only for this button
                    type="primary"
                    className={`rounded-full font-semibold ${
                      clients?.assigned
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {clients?.assigned ? "Assigned" : "Assign"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default EventView;
