import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
  const [openAddModal, setOpenAddModal] = useState(false); 
  const [editModal, setEditModal] = useState({ isOpen: false, id: null }); 
  const navigate = useNavigate(); 
 
  const [newCategory, setNewCategory] = useState(""); 
  const [editedCategory, setEditedCategory] = useState("");


  // const [category, setCategory] = useState([])

  // useEffect(()=>{
  //   fetch('http://192.168.10.220:3000/category/')
  //   .then(res => res.json())
  //   .then(data=> setCategory(data))
  // },[])

  const tableData = [
    { id: 1, eventName: "Classics Music", total: "01" },
    { id: 2, eventName: "Jazz Night", total: "02" },
    { id: 3, eventName: "Rock Fest", total: "03" },
  ];

  const handleAddCategory = () => {
    console.log("New Category Added:", newCategory);
    setOpenAddModal(false); 
    setNewCategory(""); 
  };

  const handleEditCategory = () => {
    console.log("Category Edited:", editedCategory);
    setEditModal({ isOpen: false, id: null }); 
    setEditedCategory(""); 
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
            onClick={() => navigate(-1)} 
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Category Management</span>
        </h1>

    
      <div className="flex justify-between mt-9">
        <button className="bg-[#E0CCCD] px-6 py-1 rounded">Category</button>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#050505] px-5 text-white rounded-full"
        >
          + Add
        </button>
      </div>

     
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
                  
                    <div
                      onClick={() =>
                        setEditModal({ isOpen: true, id: item.id })
                      }
                      className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
                    >
                      <MdOutlineModeEdit />
                    </div>
                   
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

     
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={null} 
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
                  onChange={(e) => setNewCategory(e.target.value)} 
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

      
      <Modal
        centered
        open={editModal.isOpen}
        onCancel={() => setEditModal({ isOpen: false, id: null })}
        footer={null} 
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
                  onChange={(e) => setEditedCategory(e.target.value)} 
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
