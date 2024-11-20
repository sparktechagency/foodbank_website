import { Modal } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Subcategory = () => {
  const [open, setOpen] = useState(false); // Modal for Add
  const [editOpen, setEditOpen] = useState(false); // Modal for Edit
  const [editData, setEditData] = useState(null); // Data for the item being edited

  // Sample data to be edited
  const [subcategoryData, setSubcategoryData] = useState([
    {
      id: 1,
      subcategory: "National Baptist Convention of America International",
      category: "Genres",
    },
    {
      id: 2,
      subcategory: "National Baptist Convention of America International",
      category: "Classics Music",
    },
  ]);

  // Open Add modal
  const handleAddOpen = () => {
    setOpen(true);
  };

  // Open Edit modal
  const handleEditOpen = (item) => {
    setEditData(item); // Set the data to be edited
    setEditOpen(true); // Open the edit modal
  };

  // Handle modal close
  const handleCancel = () => {
    setOpen(false);
    setEditOpen(false);
  };

  // Handle saving the edited data
  const handleSaveEdit = () => {
    // Here you can update the subcategory data
    setSubcategoryData((prevData) =>
      prevData.map((item) =>
        item.id === editData.id ? { ...item, ...editData } : item
      )
    );
    setEditOpen(false); // Close the modal after saving
  };

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4">
        <span className="text-[#004466] mt-[7px]">
          <FaArrowLeft />
        </span>
        <span className="text-lg font-semibold">Subcategory</span>
      </h1>

      <div>
        <div className="flex justify-between mt-9">
        <select className="bg-[#E0CCCD] px-6 py-1 rounded" name="" id="" >
            <option value="Genres">Genres</option>
            <option value="classical">classical</option>
            <option value="Millennial">Millennial</option>
          </select>
          <button
            onClick={handleAddOpen}
            className="bg-[#050505] px-5 text-white rounded-full"
          >
            + Add
          </button>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">SL no.</th>
                <th className="px-4 py-2 text-start">Subcategory</th>
                <th className="px-4 py-2 text-start">Category</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategoryData.map((item, index) => (
                <tr className="bg-[#D9D9D9]" key={item.id}>
                  <td className="px-4 py-2 text-left">{index + 1}</td>
                  <td className="px-4 py-2 text-start">{item.subcategory}</td>
                  <td className="px-4 py-2 text-start">{item.category}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <div
                      className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded"
                      onClick={() => handleEditOpen(item)} // Open edit modal
                    >
                      <MdOutlineModeEdit />
                    </div>
                    <div className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded">
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
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="font-bold text-center mb-11">+Add Category</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category</p>

              <select className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>

              <div className="w-full flex gap-3 mt-11">
                <button className="bg-[#D9000A] w-full rounded py-2 px-4 text-white">
                  Cancel
                </button>
                <button className="bg-[#004466] w-full py-2 px-4 rounded text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Subcategory Modal */}
      <Modal
        centered
        open={editOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="font-bold text-center mb-11">Edit Subcategory</div>
          <div className="mx-20">
            <p className="mb-2">Subcategory Name</p>
            <input
              type="text"
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mb-4"
              value={editData?.subcategory || ""}
              onChange={(e) =>
                setEditData({ ...editData, subcategory: e.target.value })
              }
            />

            <p className="mb-2">Category</p>
            <select
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              value={editData?.category || ""}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            >
              <option value="Genres">Genres</option>
              <option value="Classics Music">Classics Music</option>
              {/* Add other categories here */}
            </select>

            <div className="w-full flex  justify-center mt-11">
              
              <button
                className="bg-[#004466]  py-2 px-4 rounded text-white"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subcategory;
