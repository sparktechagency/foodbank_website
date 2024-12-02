import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";


const eventData = [
    {
      eventName: "September Holiday Drive 9/2",
      eventType: "10",
   
    },
    {
      eventName: "Mitzvah Sunday 10/14",
      eventType: "44",
      
    },
    {
      eventName: "Mitzvah Sunday 10/28",
      eventType: "15",
    
    },
  ];
const ClientsDelivery = () => {
    return (
        <div>
            <div className="flex justify-end mb-5">
              <button
                onClick={() => setModal2Open(true)}
                className=" mt-4 bg-[#234E6F] rounded-full py-2 px-4 text-white"
              >
                Create Group
              </button>
            </div>
            <table className="min-w-full border-collapse  border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                    Client Delivery Group
                    </th>
                    <th className=" px-4 py-2 text-left text-sm font-medium">
                    # of Clients
                    </th>
                   
                    <th className=" px-4 py-2 text-left text-sm font-medium"></th>
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
                      <td className=" px-4 py-3 text-sm">{event.eventName}</td>
                      <td className=" px-4 py-3 text-sm">{event.eventType}</td>
                      
                      <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                        <Link to={'/clients/ClientDeliveryDetailsPage'}><BiDotsVerticalRounded /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
    );
};

export default ClientsDelivery;