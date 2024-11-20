import { Table, Space } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span
        className={`px-3 py-1 rounded ${
          status === "Active" ? "border border-[#338BFF] rounded-full px-7 text-[#338BFF]" : "border border-[#F3A211] rounded-full px-4 text-[#F3A211]"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <button className="" onClick={() => openModal(record)}>
          <span className="bg-[#004466] text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md">
            <MdOutlineModeEdit />
          </span>
        </button>
        <button className="bg-[#D9000A] text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md">
          <RiDeleteBin6Line />
        </button>
      </Space>
    ),
  },
];

const dataSource = Array.from({ length: 11 }).map((_, i) => ({
  key: i + 1,
  sl: `#0${1 + i}`,
  name: `Hawaiian Music`,
  durationTime: `1 Hour`,
  price: "2.30",
  descricption: "Limited profile views per day, limited voice notes and message, standard verification process",
  status: i % 2 === 0 ? "Active" : "Upcoming",
  subscription: i % 2 === 0 ? "Monthly" : "Yearly",
}));

const Subscription = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <span className="text-[#004466] mt-[7px]">
            <FaArrowLeft />
          </span>
          <span className="text-lg font-semibold">Subscription</span>
        </h1>
        <button onClick={() => setOpen(true)} className="bg-[#02111E] py-2 px-3 rounded text-white">
          + Add Subscription
        </button>
      </div>

      <Table columns={columns(openModal)} dataSource={dataSource} />

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

          <div>
            <p className="mb-1">Name</p>
            <select
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
              value={selectedRecord ? selectedRecord.name : ""}
            >
              <option value="gold">Gold</option>
              <option value="primary">Primary</option>
            </select>
          </div>

          <div className="my-3">
            <p className="mb-1">Time Duration</p>
            <select
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
              value={selectedRecord ? selectedRecord.durationTime : ""}
            >
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
            </select>
          </div>

          <div>
            <p className="mb-1">Price</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              value={selectedRecord ? selectedRecord.price : ""}
            />
          </div>

          <div className="mt-3">
            <p className="mb-1">Description</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              value={selectedRecord ? selectedRecord.descricption : ""}
            />
          </div>

          <div className="w-full flex gap-3 mt-11">
            <button className="bg-[#02111E] w-full rounded py-2 px-4 text-white">Save</button>
            <button className="bg-[#D9000A] w-full py-2 px-4 rounded text-white">Cancel</button>
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

          <div>
            <p className="mb-1">Name</p>
            <select className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11">
              <option value="gold">Gold</option>
              <option value="primary">Primary</option>
            </select>
          </div>

          <div className="my-3">
            <p className="mb-1">Time Duration</p>
            <select className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11">
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
            </select>
          </div>

          <div>
            <p className="mb-1">Price</p>
            <input className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]" type="text" />
          </div>

          <div className="mt-3">
            <p className="mb-1">Description</p>
            <input className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]" type="text" />
          </div>

          <div className="w-full flex gap-3 mt-11">
            <button className="bg-[#02111E] w-full rounded py-2 px-4 text-white">Save</button>
            <button className="bg-[#D9000A] w-full py-2 px-4 rounded text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
