import { Table, Space, Modal } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseSubscription from "../../hook/UseSubscription";
import UseAxios from "../../hook/UseAxios";
import Swal from "sweetalert2";

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
    title: "Interval",
    dataIndex: "interval",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
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

const Subscription = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [open, setOpen] = useState(false);
  const [subscription, isLoading, refetch] = UseSubscription(); 
  const navigate = useNavigate();

  const axiosUrl = UseAxios();

  
  const [editForm, setEditForm] = useState({
    name: '',
    interval: 'month',
    unitAmount: '',
    description: ''
  });


  const [addForm, setAddForm] = useState({
    name: '',
    interval: 'month',
    unitAmount: '',
    description: ''
  });

  const openModal = (record) => {
    setSelectedRecord(record);
    setEditForm({
      name: record.name,
      interval: record.interval.toLowerCase(),
      unitAmount: record.price.replace(/\s/g, ''), 
      description: record.description === '-' ? '' : record.description
    });
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();

    const newSubscription = {
      name: addForm.name,
      interval: addForm.interval,
      unitAmount: parseFloat(addForm.unitAmount),
      description: addForm.description,
    };

    try {
      const response = await axiosUrl.post("/plan/create", newSubscription);
      console.log("Response from server:", response);
      if (response.data.message === "Plan created successfully") {
        refetch();
        setOpen(false);
      
        setAddForm({
          name: '',
          interval: 'month',
          unitAmount: '',
          description: ''
        });
       
        Swal.fire({
          title: 'Success!',
          text: 'Subscription plan added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error creating subscription: ", error);
      console.error("Error response:", error.response);
      
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong, please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
  
    if (!selectedRecord) return;
  
    const updatedSubscription = {};
  

    if (editForm.name !== selectedRecord.name) {
      updatedSubscription.name = editForm.name;
    }
    if (editForm.interval !== selectedRecord.interval) {
      updatedSubscription.interval = editForm.interval;
    }
    if (parseFloat(editForm.unitAmount) !== parseFloat(selectedRecord.price.replace(/\s/g, ''))) {
      updatedSubscription.unitAmount = parseFloat(editForm.unitAmount);
    }
    if (editForm.description !== selectedRecord.description) {
      updatedSubscription.description = editForm.description || '-';
    }
  
    if (Object.keys(updatedSubscription).length === 0) {
      Swal.fire({
        title: 'No changes detected!',
        text: 'You did not modify any field.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      const response = await axiosUrl.put(`/plan/edit/${selectedRecord.key}`, updatedSubscription);
  
      console.log("Response from server:", response);
  
      if (response.data.message === "Plan updated successfully") {
        refetch();
        setModal2Open(false);
        setSelectedRecord(null);
        
        Swal.fire({
          title: 'Success!',
          text: 'Subscription plan updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Error updating subscription: ", error);
      console.error("Error response:", error.response);
    
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong, please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
 
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const dataSource = subscription.map((plan, index) => ({
    key: plan._id,
    sl: index + 1,
    name: plan.name,
    interval: plan.interval,
    price: `${plan.unitAmount} `,
    description: plan.description || "-",
  }));

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <button
            className="text-[#EF4849] -mt-[12px]"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Subscription</span>
        </h1>
        <button
          onClick={() => {
            setAddForm({
              name: '',
              interval: 'month',
              unitAmount: '',
              description: ''
            });
            setOpen(true);
          }}
          className="bg-[#02111E] py-2 px-3 rounded text-white"
        >
          + Add Subscription
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns(openModal)}
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
          <h1 className="text-center font-bold mb-2">Edit Subscription</h1>

          <form onSubmit={handleUpdateSubscription}>
            {/* Name Field */}
            <div>
              <p className="mb-1">Name</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditFormChange}
                required
              />
            </div>

            {/* Time Duration Field */}
            <div className="my-3">
              <p className="mb-1">Time Duration</p>
              <select
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
                name="interval"
                value={editForm.interval}
                onChange={handleEditFormChange}
                required
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>

            {/* Price Field */}
            <div>
              <p className="mb-1">Price</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="number"
                name="unitAmount"
                value={editForm.unitAmount}
                onChange={handleEditFormChange}
                required
              />
            </div>

            {/* Description Field */}
            <div className="mt-3">
              <p className="mb-1">Description</p>
              <textarea
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] text-lg"
                rows="5"
                name="description"
                value={editForm.description}
                onChange={handleEditFormChange}
                placeholder="Write your description here..."
                required
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="w-full flex gap-3 mt-11">
              <button 
                type="submit" 
                className="bg-[#02111E] w-full rounded py-2 px-4 text-white"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-[#D9000A] w-full py-2 px-4 rounded text-white"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
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
          <h1 className="text-center font-bold mb-2">Add Subscription</h1>

          <form onSubmit={handleAddSubscription}>
            {/* Name Field */}
            <div>
              <p className="mb-1">Name</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="text"
                name="name"
                value={addForm.name}
                onChange={handleAddFormChange}
                required
              />
            </div>

            {/* Time Duration Field */}
            <div className="my-3">
              <p className="mb-1">Time Duration</p>
              <select
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
                name="interval"
                value={addForm.interval}
                onChange={handleAddFormChange}
                required
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>

           
            <div>
              <p className="mb-1">Price</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="number"
                name="unitAmount"
                value={addForm.unitAmount}
                onChange={handleAddFormChange}
                required
              />
            </div>

            
            <div className="mt-3">
              <p className="mb-1">Description</p>
              <textarea
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] text-lg"
                rows="5"
                name="description"
                value={addForm.description}
                onChange={handleAddFormChange}
                placeholder="Write your description here..."
                required
              />
            </div>

           
            <div className="w-full flex gap-3 mt-11">
              <button 
                type="submit" 
                className="bg-[#02111E] w-full rounded py-2 px-4 text-white"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-[#D9000A] w-full py-2 px-4 rounded text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;