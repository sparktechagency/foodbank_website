import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { Link } from "react-router-dom";

const ConfirmedVoluntrees = () => {
    const eventData = [
        {
          valunteerName: "Ellen Beffer",
          volunteerType: "Driver",
          deliveryLocation: "Hallandale",
          
          driver: "No",
          assigned: "Yes",
          
          clients: "view",
        },
        {
          valunteerName: "Ellen Beffer",
          volunteerType: "Driver",
          deliveryLocation: "Hallandale",
          
          driver: "No",
          assigned: "Yes",
          
          clients: "view",
        },
        {
          valunteerName: "Ellen Beffer",
          volunteerType: "Driver",
          deliveryLocation: "Hallandale",
          
          driver: "No",
          assigned: "Yes",
          
          clients: "view",
        },
      ];
      
  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] px-5 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>{" "}
          <IoIosArrowForward className="mt-1" /> Mitzvah Sunday 10/28
        </h1>

        <h1 className="text-2xl font-bold mt-3">Delivery Drivers: Confirmed Volunteers</h1>

        <div className="flex gap-5 mt-3 ">
          <span className="flex">
            <IoIosTimer className="text-xl mt-[3px] mr-1" />
            10/28/2024, 8:30AM - 11AM
          </span>
          <span>|</span>
          <span className="flex">
            <CiLocationOn className="text-xl mt-[3px] mr-1" />
            The Cupboard
          </span>
          <span>|</span>
          <span>Mitzvah Day</span>
        </div>
      </div>




      <div className="mt-5 lg:flex justify-between px-5 pt-3">
          {/* Search Box */}
          <div className="flex items-center border-b border-gray-300 px-1 w-full mr-5 pb-3">
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
              placeholder="Search Event"
              className="ml-2 flex-1 bg-white outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          </div>


         <div className="mx-5">
         <table className="min-w-full border-collapse  mt-6 border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Volunteer Name
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Volunteer Type
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Preferred Delivery Location
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Vip Driver
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                      Assigned
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                     Clients
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {eventData.map((event, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className=" px-4 py-3 text-sm">{event.valunteerName}</td>
                      <td className=" px-4 py-3 text-sm">{event.volunteerType}</td>
                      <td className=" px-4 py-3 text-sm">{event.deliveryLocation}</td>
                      
                     
                      <td className="px-4 py-3 text-sm">
                        {event.driver}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {event.assigned}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link to={'/event/eventView'}><span className="bg-[#EDEDED] py-1 px-2 font-semibold rounded-full text-[#234E6F]">{event.clients}</span></Link>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
         </div>


    </div>
  );
};

export default ConfirmedVoluntrees;
