import { Modal, Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";
import ClientsDelivery from "../../components/clients/ClientsDelivery";
import Swal from "sweetalert2";
import { ClientsSectionTable } from "./ClientsSectionTable";

const Clients = () => {
  const [activeTab, setActiveTab] = useState("list");
  

  return (
    <div className="lg:px-5 px-2 lg:pt-10 pt-5 min-h-screen">
      <div className="">
        <h1 className="text-2xl font-bold">Clients</h1>
      </div>

      <div className="lg:mt-10 mt-5">
        <div className="flex gap-4 rounded-lg p-[px] ">
          <button
            onClick={() => setActiveTab("list")}
            className={`${
              activeTab === "list"
                ? " border-b-2 border-blue-600"
                : "bg-transparent"
            } px-2 py-1`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`${
              activeTab === "calendar"
                ? "  border-b-2 border-blue-600"
                : "bg-transparent"
            } py-1  px-2`}
          >
            Clients Delivery Groups
          </button>
        </div>
        <hr />

        <div className="">
          {activeTab === "list" && (
            <>
              
              <ClientsSectionTable></ClientsSectionTable>
            </>
          )}
          {activeTab === "calendar" && (
            <div className="">
              {/* Calendar View */}
              <ClientsDelivery></ClientsDelivery>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Clients;
