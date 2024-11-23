import { Modal } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseCategory from "../../hook/UseCategory";
import UseAxios from "../../hook/UseAxios";

const Subcategory = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const [category, isLoading, refetch] = UseCategory();

  const axiosUrl = UseAxios();

  const navigate = useNavigate();

  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (item) => {
    setEditData(item);
    setEditOpen(true);
  };

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

  const handleSubCategoryAdd = async () => {
    try {
      const response = await axiosUrl.post("/sub-category/create", {
        categoryId: categoryName, // Selected category ID
        title: subcategoryName, // New subcategory name
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        refetch(); // Refresh category data
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add the subcategory. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong! Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setOpen(false); // Close modal
  };

  const handleDeleted = () => {
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
        <button className="text-[#EF4849]  " onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Subcategory</span>
      </h1>

      <div>
        <div className="flex justify-between mt-9">
          <select className="bg-[#E0CCCD] px-6 py-1 rounded" name="" id="">
            {category.map((cat) => (
              <>
                <option value={cat.title}>{cat.title}</option>
              </>
            ))}
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
              {category.map((item, index) => (
                <tr className="bg-[#D9D9D9]" key={item._id}>
                  <td className="px-4 py-2 text-left">{index + 1}</td>
                  <td className="px-4 py-2 text-start flex">
                    {/* Map over subCategories */}
                    {item.subCategories.map((sub, subIndex) => (
                      <div key={subIndex}>{sub.title}, </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-start">{item.title}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded"
                      onClick={() => handleEditOpen(item)}
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <button
                      onClick={handleDeleted}
                      className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded"
                    >
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
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                value={categoryName} // Holds selected category ID
                onChange={(e) => setCategoryName(e.target.value)} // Set category ID
              >
                <option value="" disabled>
                  Select a category
                </option>
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <p className="mb-2 mt-4">Subcategory</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mb-4"
                type="text"
                placeholder="Enter Subcategory Name"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
              />

              <div className="w-full flex gap-3 mt-11">
                <button className="bg-[#D9000A] w-full rounded py-2 px-4 text-white">
                  Cancel
                </button>
                <button
                  className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                  onClick={handleSubCategoryAdd}
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
