import { Link } from "react-router-dom";

export const ClientDetailsSection = () => {
  const eventData = [
    {
      event: "September Holiday Drive 9/2",
      driver: "Holiday Drive",
      schedule: "9/2/24",
      confirmation: "confirmed",
      dietary: "None",
      people: "1",
      bags: "3",
    },
    {
      event: "Mitzvah Sunday 10/14",
      driver: "Mitzvah Day",
      schedule: "10/14/24",
      confirmation: "confirmed",
      dietary: "None",
      people: "1",
      bags: "3",
    },
    {
      event: "Mitzvah Sunday 10/28",
      driver: "Mitzvah Day",
      schedule: "10/28/24",
      confirmation: "confirmed",
      dietary: "None",
      people: "1",
      bags: "3",
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-md font-semibold mb-1 mt-8">Events</h1>
        <table className="lg:w-full w-[1000px] border-collapse  border border-gray-300">
          <thead>
            <tr className="bg-gray-100 ">
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Event
              </th>

              <th className=" px-4 py-2 text-left text-sm font-medium">
                Schedule Date
              </th>

              <th className=" px-4 py-2 text-left text-sm font-medium">
                Dietary Restrictions
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                # of People
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                # of Bags
              </th>
              <th className=" px-4 py-2 text-left text-sm font-medium">
                Delivery Instructions
              </th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className=" px-4 py-3 text-sm">
                  <Link to={"/event/eventDetails"}>
                    <p className="text-[#007AFF] underline">{event.event}</p>
                  </Link>
                </td>

                <td className=" px-4 py-3 text-sm">{event.schedule}</td>

                <td className="px-4 py-3 text-sm">{event.dietary}</td>
                <td className="px-4 py-3 text-sm">{event.people}</td>
                <td className="px-4 py-3 text-sm">{event.bags}</td>
                <td className="px-4 py-3 text-sm"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
