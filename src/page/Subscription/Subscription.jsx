import { Table, Space } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

// Columns definition with the edit action
const columns = (openModal) => [
  {
    title: "SL no.",
    dataIndex: "sl",
    width: 70,
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Duration Time",
    dataIndex: "durationTime",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Descricption",
    dataIndex: "descricption",
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <button onClick={() => openModal(record)}>
          <span className="bg-[#004466] text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md">
            <MdOutlineModeEdit />
          </span>
        </button>
      </Space>
    ),
  },
];

// Sample data source
const dataSource = Array.from({ length: 3 }).map((_, i) => ({
  key: i + 1,
  sl: `#0${1 + i}`,
  name: `Gold`,
  durationTime: `jan`,
  price: "2.30",
  descricption:
    "Limited profile views per day, limited voice notes and message, standard verification process",
  subscription: i % 2 === 0 ? "Monthly" : "Yearly",
}));

const Subscription = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Open the edit modal with the selected record
  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  // Close the edit modal and clear the selected record
  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <button
            className="text-[#EF4849] -mt-[12px]"
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Subscription</span>
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#02111E] py-2 px-3 rounded text-white"
        >
          + Add Subscription
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns(openModal)} // Pass openModal to handle edit
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          hideOnSinglePage: false,
        }}
      />

      {/* Edit Modal */}
      <Modal
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <div>
          <h1 className="text-center font-bold mb-2">+Edit Subscription</h1>

          {/* Name Field */}
          <div>
            <p className="mb-1">Name</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
            />
          </div>

          {/* Time Duration Field */}
          <div className="my-3">
            <p className="mb-1">Time Duration</p>
            <select
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
              defaultValue={selectedRecord?.durationTime || ""}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Price Field */}
          <div>
            <p className="mb-1">Price</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              defaultValue={selectedRecord?.price || ""}
            />
          </div>

          {/* Description Field */}
          <div className="mt-3">
            <p className="mb-1">Description</p>
            <textarea
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] text-lg"
              rows="5"
              placeholder="Write your description here..."
              defaultValue={selectedRecord?.descricption || ""}
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="w-full flex gap-3 mt-11">
            <button className="bg-[#02111E] w-full rounded py-2 px-4 text-white">
              Save
            </button>
            <button
              className="bg-[#D9000A] w-full py-2 px-4 rounded text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Subscription Modal */}
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={500}
      >
        <div>
          <h1 className="text-center font-bold mb-2">+Add Subscription</h1>

          {/* Name Field */}
          <div>
            <p className="mb-1">Name</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
            />
          </div>

          {/* Time Duration Field */}
          <div className="my-3">
            <p className="mb-1">Time Duration</p>
            <select className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11">
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Price Field */}
          <div>
            <p className="mb-1">Price</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
            />
          </div>

          {/* Description Field */}
          <div className="mt-3">
            <p className="mb-1">Description</p>
            <textarea
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] text-lg"
              rows="5"
              placeholder="Write your description here..."
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="w-full flex gap-3 mt-11">
            <button className="bg-[#02111E] w-full rounded py-2 px-4 text-white">
              Save
            </button>
            <button
              className="bg-[#D9000A] w-full py-2 px-4 rounded text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
