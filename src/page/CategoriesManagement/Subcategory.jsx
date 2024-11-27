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

  const handleAddOpen = () => setOpen(true);

  const handleEditOpen = (item, sub) => {
    setEditData({
      id: sub._id,
      subcategory: sub.title,
      category: item.title,
    });
    setEditOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditOpen(false);
  };


  const handleSaveEdit = async () => {
    try {
      const response = await axiosUrl.put(`/sub-category/update/${editData.id}`, {
        title: editData.subcategory,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Subcategory updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch(); 
      } else {
        throw new Error("Failed to update subcategory");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong! Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setEditOpen(false);
  };

  const handleDeleted = async (subId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosUrl.delete(`/sub-category/delete/${subId}`);

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Subcategory has been deleted.",
              icon: "success",
            });
            refetch(); 
          } else {
            throw new Error("Failed to delete subcategory");
          }
        } catch (error) {
          console.error("Error deleting subcategory:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong! Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleSubCategoryAdd = async () => {
    try {
      const response = await axiosUrl.post("/sub-category/create", {
        categoryId: categoryName,
        title: subcategoryName,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
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
    setOpen(false);
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
              <option value={cat.title} key={cat._id}>
                {cat.title}
              </option>
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
              {category.map((item, index) =>
                item.subCategories.map((sub, subIndex) => (
                  <tr className="bg-[#D9D9D9]" key={sub._id}>
                    <td className="px-4 py-2 text-left">
                      {index + 1}.{subIndex + 1}
                    </td>
                    <td className="px-4 py-2 text-start">{sub.title}</td>
                    <td className="px-4 py-2 text-start">{item.title}</td>
                    <td className="px-4 py-2 text-right flex gap-2 justify-end">
                      <button
                        className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded"
                        onClick={() => handleEditOpen(item, sub)}
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        onClick={() => handleDeleted(sub._id)}
                        className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal centered open={open} onCancel={handleCancel} footer={null} width={600}>
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">+ Add Category</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category Name</p>
              <select
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
                <button
                  className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  onClick={handleCancel}
                >
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

      {/* Edit Modal */}
      <Modal centered open={editOpen} onCancel={handleCancel} footer={null} width={600}>
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">Edit Subcategory</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category Name</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#D9D9D9] mb-4"
                type="text"
                value={editData?.category}
                disabled
              />

              <p className="mb-2">Subcategory Name</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mb-4"
                type="text"
                value={editData?.subcategory || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    subcategory: e.target.value,
                  }))
                }
              />

              <div className="w-full flex gap-3 mt-11">
                <button
                  className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subcategory;
