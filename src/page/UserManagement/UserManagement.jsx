import { Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "antd";
import Profile from "../../assets/header/profileLogo.png";

const columns = (openModal) => [
  {
    title: "SL no.",
    dataIndex: "sl",
    width: 70,
    align: "center",
  },
  {
    title: "User's Name",
    dataIndex: "userName",
    width: 150,
    render: (text) => (
      <Space>
        <img
          src="https://via.placeholder.com/32"
          alt="avatar"
          style={{ borderRadius: "50%", width: 32, height: 32 }}
        />
        {text}
      </Space>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Date of birth",
    dataIndex: "dateOfBirth",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Subscription",
    dataIndex: "subscription",
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        {/* LuEye button will trigger the modal */}
        <button className="mt-2" onClick={() => openModal(record)}>
          <span className="text-xl">
            <LuEye />
          </span>
        </button>
        <button className="bg-red-600 text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md">
          <MdBlockFlipped />
        </button>
      </Space>
    ),
  },
];

const dataSource = Array.from({ length: 11 }).map((_, i) => ({
  key: i + 1,
  sl: `#${1233 + i}`,
  userName: `User ${i + 1}`,
  address: "456 Elm Street, Los Angeles, CA 90001",
  dateOfBirth: "05/12/2024",
  contactNumber: `(201) 555-01${i}4`,
  email: `user${i + 1}@gmail.com`,
  subscription: i % 2 === 0 ? "Monthly" : "Yearly",
}));

const UserManagement = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
          <span className="text-lg font-semibold">User Management</span>
        </h1>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      <Table columns={columns(openModal)} dataSource={dataSource} />

      <div className="text-black -mt-11"></div>

      {/* Modal */}
      <Modal
  centered
  open={modal2Open}
  onCancel={closeModal}
  footer={null}
  closable={false}
  width={400}
  bodyStyle={{ borderRadius: 0 }} // Ensures no border-radius for the content
  className="no-border-radius-modal"
>
  <div className="flex justify-center py-8">
    <img
      className="w-[70px] h-[70px] rounded-full"
      src={Profile}
      alt="profile"
    />
  </div>
  <div>
    <div className="grid grid-cols-2">
      <div className="text-lg gap-4">
        <h4>Name:</h4>
        <h4>Date of birth:</h4>
        <h4>Contact Number:</h4>
        <h4>Email:</h4>
        <h4>Subscription:</h4>
        <h4>Address:</h4>
      </div>
      <div className="gap-4 text-lg text-neutral-500">
        <h3>{selectedRecord?.userName}</h3>
        <h3>{selectedRecord?.dateOfBirth}</h3>
        <h3>{selectedRecord?.contactNumber}</h3>
        <h3>{selectedRecord?.email}</h3>
        <h3>{selectedRecord?.subscription}</h3>
        <div className="bg-[#D9D9D9] p-3 rounded">
          {selectedRecord?.address}
        </div>
      </div>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default UserManagement;
