import { message, Modal, Select } from "antd";
import { useState } from "react";
import { AddAdmin } from "./AddAdmin";
import { useDeleteUserMutation, useGetAllUserQuery } from "../redux/api/userApi";
import { Loading } from "../../Basic/Loading";

const Admin = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearch] = useState("");
  const { data: allUser, isLoading } = useGetAllUserQuery({searchTerm, sortOrder:sortOrder});
  const [deleteUser] = useDeleteUserMutation();
  console.log(allUser);

  // Handle user delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteUser(id).unwrap();
          message.success(response.message);
        } catch (error) {
          console.error("Error deleting user:", error);
          message.error(error.data?.message || "Failed to delete user.");
        }
      },
    });
  };

  // Fallback for loading or empty data
  if (isLoading) {
    return <Loading></Loading>
  }

  // if (!allUser?.data?.length) {
  //   return <p>No users found.</p>;
  // }
  const handleShortChange = (value) => {
    console.log(value);
    setSortOrder(value); // Update the selected filter type
  };


  return (
    <div>
      <div className="lg:px-5 px-2 lg:pt-10 pt-5">
        <h1 className="text-2xl font-bold">User Role</h1>
      </div>
      <div>
        <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
          {/* Search Box */}
          <div className="flex items-center border-b py-3 border-gray-300 px-1 w-full mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
            </svg>
            <input
            onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Users"
              className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex justify-end mt-3 gap-3">
            <div>
            <Select
              className="w-full h-[42px]"
              placeholder="Short By"
              onChange={handleShortChange}
              options={[
                { value: "asc", label: "Short By" },
                { value: "desc", label: "Date" },
              ]}
            />
            </div>

            <div>
              <button
                onClick={() => setModal2Open(true)}
                className="w-[150px] bg-[#234E6F] rounded-full py-2 text-white"
              >
                +Add Admin
              </button>
            </div>
          </div>
        </div>

        <div className="lg:mx-5 mx-2 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium">
                  User Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  User Creation Date
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser?.data?.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 text-sm">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    {user.role === "super_admin" ? (
                      <button
                        className="text-blue-500 bg-transparent border border-blue-500 rounded px-3 py-1"
                        disabled
                      >
                        Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 bg-transparent border border-red-500 rounded px-3 py-1"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddAdmin
          setModal2Open={setModal2Open}
          modal2Open={modal2Open}
        ></AddAdmin>
      </div>
    </div>
  );
};

export default Admin;
