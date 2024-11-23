import { Modal } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Subcategory = () => {
  const [open, setOpen] = useState(false); // Modal for Add
  const [editOpen, setEditOpen] = useState(false); // Modal for Edit
  const [editData, setEditData] = useState(null); // Data for the item being edited
  const [categoryName, setCategoryName] = useState(""); // for Category in Add
  const [subcategoryName, setSubcategoryName] = useState(""); 
  
  
  const navigate = useNavigate(); 

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
    console.log("Updated Category:", editData.category);
    console.log("Updated Subcategory:", editData.subcategory);
    setSubcategoryData((prevData) =>
      prevData.map((item) =>
        item.id === editData.id ? { ...item, ...editData } : item
      )
    );
    setEditOpen(false); 
  };

  // Handle saving the Add modal data
  const handleSaveAdd = () => {
    console.log("Category Name:", categoryName);
    console.log("Subcategory Name:", subcategoryName);
    setOpen(false);
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
          title: "Deleted",
          text: "Your file has been Deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4">
          <button
            className="text-[#EF4849]  "
            onClick={() => navigate(-1)} 
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Subcategory</span>
        </h1>

      <div>
        <div className="flex justify-between mt-9">
          <select className="bg-[#E0CCCD] px-6 py-1 rounded" name="" id="">
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
                    <button
                      className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded"
                      onClick={() => handleEditOpen(item)} 
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <button onClick={handleBlock} className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded">
                      <RiDeleteBin6Line />
                    </button>
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
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">+Add Category</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category Name</p>
              <select
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              >
                <option value="Genres">Genres</option>
                <option value="Classical">Classical</option>
                <option value="Millennial">Millennial</option>
              </select>

              <p className="mb-2 mt-4">Subcategory</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mb-4"
                type="text"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
              />

              <div className="w-full flex gap-3 mt-11">
                <button className="bg-[#D9000A] w-full rounded py-2 px-4 text-white">
                  Cancel
                </button>
                <button
                  className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                  onClick={handleSaveAdd}
                >
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
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">Edit Subcategory</div>
          <div className="mx-20">
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
            </select>

            <p className="mb-2 mt-4">Subcategory Name</p>
            <input
              type="text"
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mb-4"
              value={editData?.subcategory || ""}
              onChange={(e) =>
                setEditData({ ...editData, subcategory: e.target.value })
              }
            />

            <div className="w-full flex justify-center mt-11">
              <button
                className="bg-[#004466] py-2 px-4 rounded text-white"
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
