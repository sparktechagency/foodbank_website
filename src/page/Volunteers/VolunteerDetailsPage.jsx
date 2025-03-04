import { Modal } from "antd";
import { useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { ClientDetailsSection } from "../Clients/ClientDetailsSection";

import { useGetSingleVolunteerQuery } from "../redux/api/volunteerApi";
import { EditAllVolunteerGroup } from "./EditAllVolunteerGroup";

const VolunteerDetailsPage = () => {
  // const [modal2Open, setModal2Open] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, group: null });
  const { id } = useParams();
  const { data: singleClientData } = useGetSingleVolunteerQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  const client = singleClientData?.data?.result;

  const handleEdit = (client) => {
   
    setEditModal({
      isOpen: true,
      client,
    });
  };

  return (
    <div className="min-h-screen lg:px-5 px-2 lg:pt-10 pt-3">
      {/* <EditModalClient
        isModalOpen={editModal.isOpen}
        setModal2Open1={setEditModal}
        client={editModal.client}
      ></EditModalClient> */}
      <EditAllVolunteerGroup
            isModalOpen={editModal.isOpen}
            setModal2Open1={setEditModal}
            client={editModal?.client}
          />

      <div className="bg-[#FAFAFA]">
        <h1 className="flex gap-1">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> {client?.firstName}{" "}
          {client?.lastName}
        </h1>
        <h1 className="text-2xl font-bold mt-3">
          {client?.firstName} {client?.lastName}
        </h1>
      </div>

      <div className="lg:px-5 px-2 pt-5 text-sm lg:text-base">
        <h2 className="text-md font-semibold mb-1">Details</h2>
        <div className="flex justify-between border p-5 max-w-[900px]">
          <div>
            <div className="flex gap-16">
              <div>
                <div className="mb-8">
                  <h1 className="font-semibold">First Name</h1>
                  <p>{client?.firstName}</p>
                </div>

                <div className="mb-8">
                  <h1 className="font-semibold">Alternate Phone</h1>
                  <p>{client?.alternativePhoneNo ||"No Number"}</p>
                </div>
              </div>

              <div>
                <div className="mb-7">
                  <h1 className="font-semibold">Last Name</h1>
                  <p>{client?.lastName}</p>
                </div>
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <p>{client?.phoneNo}</p>
                </div>
              </div>
            </div>
            <div>
              
              <div className="mt-4">
                <h1 className="font-semibold">Address</h1>
                <p>{client?.address}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleEdit(client)}
              className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]"
            >
              Edit
            </button>
          </div>
        </div>
        <ClientDetailsSection singleClientData={singleClientData}></ClientDetailsSection>
      </div>
    </div>
  );
};

export default VolunteerDetailsPage;
