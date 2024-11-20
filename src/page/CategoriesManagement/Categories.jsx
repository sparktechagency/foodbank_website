import { Modal } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Categories = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4">
        <span className="text-[#004466] mt-[7px]">
          <FaArrowLeft />
        </span>
        <span className="text-lg font-semibold">User Management</span>
      </h1>

      <div>
        <div className="flex justify-between mt-9">
          <button className="bg-[#E0CCCD] px-6 py-1 rounded">Category</button>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#050505] px-5 text-white rounded-full"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="mt-16">
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className="">
                <th className="px-4 py-2 text-left">SL no.</th>
                <th className="px-4 py-2 text-center">Event Name</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-left">01</td>
                <td className="px-4 py-2 text-center">Classics Music</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <div className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded">
                    <MdOutlineModeEdit />
                  </div>
                  <div className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded">
                    <RiDeleteBin6Line />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">01</td>
                <td className="px-4 py-2 text-center">Classics Music</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <div className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded">
                    <MdOutlineModeEdit />
                  </div>
                  <div className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded">
                    <RiDeleteBin6Line />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">01</td>
                <td className="px-4 py-2 text-center">Classics Music</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <div className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded">
                    <MdOutlineModeEdit />
                  </div>
                  <div className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded">
                    <RiDeleteBin6Line />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null} // Removes Cancel and OK buttons
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">+Add Category</div>
            <div>
              <div className="mx-20">
                <p className="mb-2">Category</p>

                <select
                  className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000] mr-11"
                  name=""
                  id=""
                >
                  <option className="" value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>

                <div className="w-full flex gap-3 mt-11">
                    <button className="bg-[#D9000A] w-full rounded py-2 px-4 text-white">Cancel</button>
                    <button className="bg-[#004466] w-full py-2 px-4 rounded text-white">Save</button>
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
