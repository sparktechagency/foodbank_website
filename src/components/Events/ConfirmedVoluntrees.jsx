import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetConfirmedDriverQuery,
  useGetSingleEventGroupQuery,
} from "../../page/redux/api/eventApi";
import { Dropdown, Menu } from "antd";

const ConfirmedVoluntrees = () => {
  const { id } = useParams();
  const { data: confirmedDriver } = useGetConfirmedDriverQuery(
    { eventId: id, types: "driver", accept: "yes" },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: singleClientData,
    isLoading,
    isError,
  } = useGetSingleEventGroupQuery({ id }, { refetchOnMountOrArgChange: true });

  const event = singleClientData?.data?.event;

  const dayOfEvent = event?.dayOfEvent
    ? new Date(event?.dayOfEvent).toLocaleDateString()
    : "Unknown Date";
  const time =
    event?.startOfEvent && event?.endOfEvent
      ? `${event?.startOfEvent} - ${event?.endOfEvent}`
      : "Unknown Time";

  const result = confirmedDriver?.data?.data;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="bg-[#FAFAFA] lg:px-5 px-2 pt-6">
        <h1 className="flex gap-1 ">
          <Link to={"/"}>
            <span className="text-[#007AFF]">Events</span>
          </Link>
          <IoIosArrowForward className="mt-1 " />{" "}
          <span
            onClick={() => navigate(-1)}
            className="text-[#007AFF] cursor-pointer"
          >
            {event?.eventName}
          </span>
          <IoIosArrowForward className="mt-1 " /> Drivers : Volunteers With
          Response
        </h1>

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
          <span className="hidden lg:block">|</span>
          <span>{event?.eventType?.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
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
                Email
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Vip Driver
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Assigned Client
              </th>
              {/* <th className=" px-4 py-2 text-left text-sm font-medium">
                Assigned
              </th> */}
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Clients
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result?.map((event, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className=" px-4 py-3 text-sm">
                    <Link
                      to={`/volunteers/details/${event?.driver?.userId?._id}`}
                    >
                      {event?.driver?.userId?.firstName}{" "}
                      {event?.driver?.userId?.lastName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {event?.driver?.userId?.status
                      ? event?.driver?.userId?.status.charAt(0).toUpperCase() +
                        event?.driver?.userId?.status.slice(1)
                      : ""}
                  </td>
                  <td className=" px-4 py-3 text-sm">
                    {event?.driver?.userId?.email}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {event?.driver?.userId?.volunteerType === true
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className=" px-4 py-3 text-sm">
                    {event?.assignedClientCount}
                  </td>
                  {/* <td className="px-4 py-3 text-sm">Working...</td> */}
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/event/eventView/${id}/volunteer/${event?.driver?.userId?._id}`}
                    >
                      <span className="bg-[#EDEDED] py-1 px-2 font-semibold rounded-full text-[#234E6F]">
                        View
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              key: "2",
                              label: "Remove",
                              onClick: () => handleDelete(event?._id),
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
    </div>
  );
};

export default ConfirmedVoluntrees;
