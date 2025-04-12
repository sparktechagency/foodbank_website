import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useGetCvDownloadQuery } from "../../page/redux/api/eventApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Download = ({ openAddModal, setOpenAddModal, event }) => {
  const { data: cvDownload , isLoading} = useGetCvDownloadQuery(event);
  const printRef = useRef();
  const [isDownloading, setIsDownloading] = useState()

  const handleCancel = () => {
    setOpenAddModal(false);
  };
 
  const eventDetails = cvDownload?.data?.eventDetails;
  const assignedClients = cvDownload?.data?.assignedClients;

  const handleDownload = async () => {
    setIsDownloading(true); 

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pages = document.querySelectorAll(".pdf-page");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      await html2canvas(page, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);

        const pdfRatio = pdfWidth / imgProps.width;
        const reducedHeight = imgProps.height * pdfRatio / 0.80;

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, reducedHeight);
      });
    }

    pdf.save("receipt.pdf"); 
    setIsDownloading(false);
  };

   console.log("eventDetails=========", eventDetails)
  
  // useEffect(()=>{
  //   if(!assignedClients?.length){
  //     setIsDownloading(true)
  //   } 
  // })
  

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={900}
    >
    {
      isLoading ? (
        <div className="text-center my-10">
        <p className="text-lg font-medium">Loading...</p>
      </div>
      ) : (
<div className="p-6 font-sans text-sm text-black grid justify-center">
      <button
  className="bg-cyan-700 p-2 text-white mt-4 mb-5 flex items-center justify-center gap-2"
  onClick={handleDownload}
  disabled={isDownloading}
>
  {isDownloading ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Downloading...
    </>
  ) : (
    "Download PDF"
  )}
</button>

        <div ref={printRef}>
          {assignedClients?.length?
            assignedClients.map((item, index) => (
              <div
                key={index}
                className=" grid items-stretch pdf-page h-[800px] px-10 py-6 border mb-4 bg-white"
                style={{ width: "700px", margin: "0 auto" }}
              >
                {/* Header */}
                <div className="">
                  <div className="flex justify-between items-start mt-5">
                    <div>
                      <img
                        src="https://i.imgur.com/xz0SlhF.png"
                        alt="Cupboard Logo"
                        crossOrigin="anonymous"
                        className="w-32 mb-2"
                      />
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-bold">Holocaust Survivor Assistance Program</p>
                      <p className="font-semibold">The Cupboard Delivery Client Receipt</p>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="text-center mt-2 text-sm">
                    <p className="font-bold">
                      Name : {item?.userId?.firstName}, {item?.userId?.lastName}
                    </p>
                    <p>Address: {item?.userId?.address}</p>
                    <p>Apartment: {item?.userId?.apartment}</p>
                    <p>
                      Zip: {item?.userId?.city}, {item?.userId?.zipCode}
                    </p>
                    <p>Phone: {item?.userId?.phoneNo}</p>
                    <p>Alternate Phone: {item?.userId?.alternativePhoneNo}</p>
                  </div>

                  {/* Delivery Date */}
                  <div className="mb-3">
                    <p>
                      <span className="font-bold">Delivery date:</span>{" "}
                      {eventDetails?.dayOfEvent
                        ? new Date(eventDetails.dayOfEvent).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        : "[Event date]"}
                    </p>
                  </div>

                  {/* Signature */}
                  {item?.userId?.holocaustSurvivor && (
                    <div className="border border-black h-20 flex items-center ps-5 p-1 mb-6">
                      <p className="font-bold pb-3">Client Signature:</p>
                    </div>
                  )}

                  {/* Info Table */}
                  <div className="grid grid-cols-2 gap-2 text-sm border border-black mb-5 ">
                    <div className="border-r border-black p-2">
                      <p>
                        <strong>Driver Name:</strong> {item?.assignedUId?.firstName}{" "}
                        {item?.assignedUId?.lastName}
                      </p>
                      <p>
                        <strong>Driver Phone #:</strong> {item?.assignedUId?.phoneNo}
                      </p>
                      <p>
                        <strong>Delivery Instructions:</strong>{" "}
                        {item?.userId?.deliveryInstructions}
                      </p>
                      <p className="pb-">
                        <strong>Number of Bags:</strong> {item?.userId?.badgeNumber}
                      </p>
                    </div>
                    <div className="p-2">
                      <p>
                        <strong>Household Size:</strong> {item?.userId?.peopleHousehold}
                      </p>
                      <p>
                        <strong>Dietary Restrictions:</strong>{" "}
                        {item?.userId?.dietaryRestrictions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-start items-center">
                  <img
                    src="https://i.imgur.com/5TcuWxF.png"
                    alt="Claims Conference"
                    crossOrigin="anonymous"
                    className="w-40"
                  />
                </div>
              </div>
            )):(
              <p className="text-black">No Data Available</p>
            ) }
        </div>  
      </div>
      )
    }
       
    </Modal>
  );
};

export default Download;
