import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetConfirmedDriverQuery } from "../../page/redux/api/eventApi";

const ConfirmedVoluntrees = () => {
   const { id } = useParams();
  const {data:confirmedDriver} = useGetConfirmedDriverQuery({ eventId:id ,types : 'driver', accept:'yes'},
    { refetchOnMountOrArgChange: true });

  console.log(confirmedDriver)
  const result = confirmedDriver?.data?.data;
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
      <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Events</span>{" "}
          <IoIosArrowForward className="mt-1 " />{" "}
          <span className="text-[#007AFF]">Mitzvah Sunday 10/28</span>
          <IoIosArrowForward className="mt-1 " /> Delivery Drivers : Volunteers
          With Response
        </h1>

        <h1 className="text-2xl font-bold mt-3">
          Delivery Drivers: Confirmed Volunteers
        </h1>

        <div className="lg:flex lg:gap-5 mt-3 ">
          <span className="flex">
            <IoIosTimer className="lg:text-xl text-sm mt-[3px] mr-1" />
            10/28/2024, 8:30AM - 11AM
          </span>
          <span className="hidden lg:block">|</span>
          <span className="flex">
            <CiLocationOn className="lg:text-xl text-sm mt-[3px] mr-1" />
            The Cupboard
          </span>
          <span className="hidden lg:block">|</span>
          <span>Mitzvah Day</span>
        </div>
      </div>

      <div className="mt-5 lg:flex justify-between lg:px-5 px-2 pt-3">
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

      <div className="lg:mx-5 mx-2 overflow-x-auto">
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
          {result &&
                result.map((event, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className=" px-4 py-3 text-sm">
                      {event?.userId?.firstName} {event?.userId?.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {event?.userId?.status
                        ? event.userId.status.charAt(0).toUpperCase() +
                          event.userId.status.slice(1)
                        : ""}
                    </td>
                    <td className=" px-4 py-3 text-sm">
                      {event?.userId?.address}
                    </td>

                    <td className="px-4 py-3 text-sm">{event?.userId?.volunteerType === true?'Yes':"No"}</td>
                    <td className="px-4 py-3 text-sm">Working...</td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/event/eventView/${event?.userId?._id}`}>
                        <span className="bg-[#EDEDED] py-1 px-2 font-semibold rounded-full text-[#234E6F]">
                          View
                        </span>
                      </Link>
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
