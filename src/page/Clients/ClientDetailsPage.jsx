import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const ClientDetailsPage = () => {
  const eventData = [
    {
      event: "September Holiday Drive 9/2",
      driver: "Holiday Drive",
      schedule: "9/2/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
    {
      event: "Mitzvah Sunday 10/14",
      driver: "Mitzvah Day",
      schedule: "10/14/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
    {
      event: "Mitzvah Sunday 10/28",
      driver: "Mitzvah Day",
      schedule: "10/28/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
  ];

  return (
    <div className=" min-h-screen">
      <div className="bg-[#FAFAFA] px-5 py-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> Alena Armyeva
        </h1>

        <h1 className="text-2xl font-bold mt-3">Clients</h1>
      </div>

      <div className="px-5 pt-5">
        <h2 className="text-md font-semibold mb-1 ">Details</h2>
        <div className="flex justify-between border p-5 max-w-[900px]">
          <div>
            <div className="flex gap-16">
              <div>
                <div className="mb-8">
                  <h1 className="font-semibold">First Name</h1>
                  <p>Altena</p>
                </div>

                <div className="mb-8">
                  <h1 className="font-semibold">Email</h1>
                  <p>alena@gmail.com</p>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h1 className="font-semibold">Last Name</h1>
                  <p>Faris</p>
                </div>
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <p>017232432432</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-semibold">Adress</h1>
                <p>1460 NW 80th Ave, Apt 402, Margate, FL 33063</p>
              </div>
            </div>
          </div>

          <div>
            <button className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]">
              Edit
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-md font-semibold mb-1 mt-8">Events</h1>
          <table className="min-w-full border-collapse  border border-gray-300">
            <thead>
              <tr className="bg-gray-100 ">
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Event Name
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Event Type
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Date
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className=" px-4 py-3 text-sm">
                    <p className="text-[#007AFF] underline">{event.event}</p>
                  </td>
                  <td className=" px-4 py-3 text-sm">{event.driver}</td>
                  <td className=" px-4 py-3 text-sm">{event.schedule}</td>
                  <td className="px-4 py-3 text-sm flex">
                    <p className="bg-[#F0F9F2] border border-[#81c9a6] rounded-full text-[#236847] py-1 px-3">
                      {event.confirmation}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm">{event.dietary}</td>
                  <td className="px-4 py-3 text-sm">{event.people}</td>
                  <td className="px-4 py-3 text-sm">{event.bags}</td>

                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    <BiDotsVerticalRounded />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
