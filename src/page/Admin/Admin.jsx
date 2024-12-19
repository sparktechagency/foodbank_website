import { Modal } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const [modal2Open, setModal2Open] = useState(false);

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    Holocaust: "",
    number: "",
    adress: "",
    clients: [],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Event name is required.";

    if (!formData.email.trim()) formErrors.email = "Event email is required.";

    if (!formData.password.trim())
      formErrors.password = "Event password is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to delete the user from the data
        eventData.splice(index, 1);
        Swal.fire("Deleted!", "The admin has been deleted.", "success");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setModal2Open(false);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
    console.log("Form Data:", formData);
  };

  const eventData = [
    {
      UserName: "Alena Molin",

      email: "foisal@gmail.com",
      UserCreate: "06/24/2024",
    },
    {
      UserName: "Alena Molin",

      email: "foisal@gmail.com",
      UserCreate: "06/24/2024",
    },
    {
      UserName: "Alena Molin",

      email: "foisal@gmail.com",
      UserCreate: "06/24/2024",
    },
  ];

  return (
    <div>
      <div className="lg:px-5 px-2 lg:pt-10 pt-5">
        <h1 className="text-2xl font-bold ">User Role</h1>
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
              type="text"
              placeholder="Search Users"
              className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex justify-end mt-3 gap-3 ">
            {/* Tabs for List and Calendar View */}

            {/* Filters */}

            <div>
                    <select
                      className="border rounded py-2 bg-white"
                      name=""
                      id=""
                    >
                      <option value="all events">Short By</option>
                      <option value="holiday drive">Name</option>
                      <option value="mitzvah sunday">Date</option>
                    </select>
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
              {eventData.map((event, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 text-sm">{event.UserName}</td>

                  <td className="px-4 py-3 text-sm">{event.email}</td>

                  <td className="px-4 py-3 text-sm">{event.UserCreate}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    <span className="text-red-500">
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          title="Add Admin"
          centered
          open={modal2Open}
          onCancel={() => {
            setModal2Open(false);
            setFormData({
              name: "",
              email: "",
              password: "",
            });
            setErrors({});
          }}
          footer={[
            <button
              key="save"
              onClick={handleSubmit}
              className="bg-[#234E6F] text-white rounded-full px-5 py-2"
            >
              Add
            </button>,
          ]}
        >
          <form>
            <div className="mt-4">
              <label htmlFor="name">
                <span className="font-semibold">First Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </label>
              <label htmlFor="adress">
                <span className="font-semibold">Last Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="adress"
                  name="adress"
                  id="adress"
                  value={formData.adress}
                  onChange={handleInputChange}
                />
                {errors.adress && (
                  <p className="text-red-500 text-sm">{errors.adress}</p>
                )}
              </label>

              <label htmlFor="email">
                <span className="font-semibold">Admin Email</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </label>

              <label htmlFor="number">
                <span className="font-semibold">Contact Number</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="number"
                  name="number"
                  id="number"
                  value={formData.number}
                  onChange={handleInputChange}
                />
                {errors.number && (
                  <p className="text-red-500 text-sm">{errors.number}</p>
                )}
              </label>

              <label htmlFor="password">
                <span className="font-semibold">New Admin Password</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </label>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
