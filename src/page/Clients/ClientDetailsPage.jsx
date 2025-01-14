import { Modal } from "antd";
import { useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { EditModalClient } from "./EditModalClient";
import { ClientDetailsSection } from "./ClientDetailsSection";

const ClientDetailsPage = () => {
  const [modal2Open, setModal2Open] = useState(false);

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
    <div className=" min-h-screen lg:px-5 px-2 lg:pt-10 pt-3">
      <EditModalClient
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
      ></EditModalClient>

      <div className="bg-[#FAFAFA] ">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> Alena Armyeva
        </h1>
        <h1 className="text-2xl font-bold mt-3">Alena Artmyeva</h1>
      </div>

      <div className="lg:px-5 px-2 pt-5 text-sm lg:text-base">
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
                  <h1 className="font-semibold">Alternate Phone</h1>
                  <p>983-344-5332</p>
                </div>
              </div>

              <div>
                <div className="mb-7">
                  <h1 className="font-semibold">Last Name</h1>
                  <p>Faris</p>
                </div>
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <p>983-344-5332</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <Link to={"/clients"}>
                  <button className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]">
                    Archive
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                <h1 className="font-semibold">Adress</h1>
                <p>1460 NW 80th Ave, Apt 402, Margate, FL 33063</p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setModal2Open(true)}
              className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]"
            >
              Edit
            </button>
          </div>
        </div>
        <ClientDetailsSection></ClientDetailsSection>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
