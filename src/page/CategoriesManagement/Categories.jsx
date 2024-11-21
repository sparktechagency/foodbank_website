import { Modal } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
  const [openAddModal, setOpenAddModal] = useState(false); // Add Modal State
  const [editModal, setEditModal] = useState({ isOpen: false, id: null }); // Edit Modal State
  const navigate = useNavigate(); 
  // State to manage input values
  const [newCategory, setNewCategory] = useState(""); // For Add Category Modal
  const [editedCategory, setEditedCategory] = useState(""); // For Edit Category Modal

  // Table data as an array of objects
  const tableData = [
    { id: 1, eventName: "Classics Music", total: "01" },
    { id: 2, eventName: "Jazz Night", total: "02" },
    { id: 3, eventName: "Rock Fest", total: "03" },
  ];

  // Function to handle saving new category
  const handleAddCategory = () => {
    console.log("New Category Added:", newCategory);
    setOpenAddModal(false); // Close the modal after saving
    setNewCategory(""); // Clear input
  };

  // Function to handle saving edited category
  const handleEditCategory = () => {
    console.log("Category Edited:", editedCategory);
    setEditModal({ isOpen: false, id: null }); // Close the edit modal
    setEditedCategory(""); // Clear input
  };

  const handleBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Delete",
          text: "Your file has been Delete.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4">
          <button
            className="text-[#EF4849] "
            onClick={() => navigate(-1)} // পূর্ববর্তী পেজে নেভিগেট করবে
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Category Management</span>
        </h1>

      {/* Add Category Button */}
      <div className="flex justify-between mt-9">
        <button className="bg-[#E0CCCD] px-6 py-1 rounded">Category</button>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#050505] px-5 text-white rounded-full"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="mt-16">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">SL no.</th>
                <th className="px-4 py-2 text-center">Event Name</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-left">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{item.eventName}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    {/* Edit Button */}
                    <div
                      onClick={() =>
                        setEditModal({ isOpen: true, id: item.id })
                      }
                      className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
                    >
                      <MdOutlineModeEdit />
                    </div>
                    {/* Delete Button */}
                    <div onClick={handleBlock} className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded cursor-pointer">
                      <RiDeleteBin6Line />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={null} // Removes Cancel and OK buttons
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">+ Add Category</div>
            <div>
              <div className="mx-20">
                <p className="mb-2">Category</p>
                <input
                  className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)} // Bind input value
                />
                <div className="w-full flex gap-3 mt-11">
                  <button
                    onClick={() => setOpenAddModal(false)}
                    className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        centered
        open={editModal.isOpen}
        onCancel={() => setEditModal({ isOpen: false, id: null })}
        footer={null} // Removes Cancel and OK buttons
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">Edit Category</div>
            <div>
              <div className="mx-20">
                <p className="mb-2">Category</p>
                <input
                  className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                  type="text"
                  placeholder="Edit category name"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)} // Bind input value
                  defaultValue={
                    tableData.find((item) => item.id === editModal.id)?.eventName
                  }
                />
                <div className="w-full flex gap-3 mt-11">
                  <button
                    onClick={() => setEditModal({ isOpen: false, id: null })}
                    className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditCategory}
                    className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
