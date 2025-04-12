import { Modal } from "antd";
import React, { useRef } from "react";
import { useGetCvDownloadQuery } from "../../page/redux/api/eventApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Download = ({ openAddModal, setOpenAddModal, event }) => {
  const { data: cvDownload } = useGetCvDownloadQuery(event);
  const printRef = useRef();

  const handleCancel = () => {
    setOpenAddModal(false);
  };

  const handleDownload = () => {
    const input = printRef.current;
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      // প্রথম পেইজ
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
  
      // যদি height বেশি হয়, তাহলে আরও পেইজ অ্যাড করো
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
  
      pdf.save("receipt.pdf");
    });
  };
  

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <div className="p-6 font-sans text-sm text-black">
        {/* PDF Content Wrapper */}
        <div ref={printRef}>
          {cvDownload?.data?.map((item, index) => (
            <div key={index}>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <img
                    src="https://i.imgur.com/xz0SlhF.png"
                    alt="Cupboard Logo"
                    className="w-32 mb-2"
                  />
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold">Holocaust Survivor Assistance Program</p>
                  <p className="font-semibold">The Cupboard Delivery Client Receipt</p>
                </div>
              </div>

              {/* Client Name and Address */}
              <div className="text-center mt-2 mb-4 text-sm">
                <p className="font-bold">
                  Name : {item?.userId?.firstName}, {item?.userId?.lastName}
                </p>
                <p>Address: {item?.userId?.address}</p>
                <p>Apartment: {item?.userId?.apartment}</p>
                <p>Zip: {item?.userId?.city}, {item?.userId?.zipCode}</p>
                <p>Phone: {item?.userId?.phoneNo}</p>
                <p>Alternate Phone: {item?.userId?.alternativePhoneNo}</p>
              </div>

              {/* Delivery Date */}
              <div className="mb-3">
                <p>
                  <span className="font-bold">Delivery date:</span> {event?.date || "[Event date]"}
                </p>
              </div>

              {/* Signature */}
              <div className="border border-black h-20 flex items-end p-1 mb-6">
                <p className="font-bold">Client Signature:</p>
              </div>

              {/* Info Table */}
              <div className="grid grid-cols-2 gap-2 text-sm border border-black">
                {/* Driver Column */}
                <div className="border-r border-black p-2">
                  <p><strong>Driver Name:</strong> [Driver name]</p>
                  <p><strong>Driver Phone #:</strong> [Driver phone #]</p>
                  <p><strong>Delivery Instructions:</strong> [Delivery Instructions]</p>
                  <p><strong>Number of Bags:</strong> [Number of Bags]</p>
                </div>
                {/* Client Column */}
                <div className="p-2">
                  <p><strong>Household Size:</strong> [number of people in household]</p>
                  <p><strong>Dietary Restrictions:</strong> [Dietary Restrictions]</p>
                </div>
              </div>

              {/* Footer Logo */}
              <div className="mt-4 flex justify-start items-center">
                <img
                  src="https://i.imgur.com/5TcuWxF.png"
                  alt="Claims Conference"
                  className="w-40"
                />
              </div>

              <hr className="my-6" />
            </div>
          ))}
        </div>

        {/* Download Button */}
        <button
          className="bg-cyan-700 p-2 text-white mt-4"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      </div>
    </Modal>
  );
};

export default Download;
