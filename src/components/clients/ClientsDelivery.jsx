import { Modal } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";

const eventData = [
  {
    eventName: "September Holiday Drive 9/2",
    eventType: "10",
  },
  {
    eventName: "Mitzvah Sunday 10/14",
    eventType: "44",
  },
  {
    eventName: "Mitzvah Sunday 10/28",
    eventType: "15",
  },
];
const ClientsDelivery = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    clients: [],
  });

  const availableClients = [
    "Alena Artmyeva",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleAddClient = (client) => {
    if (!formData.clients.includes(client)) {
      setFormData((prevData) => ({
        ...prevData,
        clients: [...prevData.clients, client],
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Client Group Name is required";
    }
    if (formData.clients.length === 0) {
      errors.clients = "At least one client must be selected";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    console.log("Form Data:", formData);
    setModalOpen(false);
    setFormData({
      name: "",
      clients: [],
    });
    setFormErrors({});
  };
  return (
    <div>
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setModalOpen(true)}
          className=" mt-4 bg-[#234E6F] rounded-full py-2 px-4 text-white"
        >
          Create Group
        </button>
      </div>
      <table className="min-w-full border-collapse  border border-gray-300">
        <thead>
          <tr className="bg-gray-100 ">
            <th className=" px-4 py-2 text-left text-sm font-medium">
              Client Delivery Group
            </th>
            <th className=" px-4 py-2 text-left text-sm font-medium">
              # of Clients
            </th>

            <th className=" px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className=" px-4 py-3 text-sm">
                <Link to={"/clients/ClientDeliveryDetailsPage"}>
                  {event.eventName}
                </Link>
              </td>
              <td className=" px-4 py-3 text-sm">{event.eventType}</td>

              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <details className="dropdown">
                  <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                    <BiDotsVerticalRounded />
                  </summary>
                  <ul className="menu dropdown-content bg-white text-black rounded z-30 right-0 w-44 p-2 shadow">
                    <li>
                      <a onClick={() => setModalOpen(true)}>Edit</a>
                    </li>
                    <li>
                      <a>Delete</a>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Create New Client Group"
        centered
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setFormData({
            name: "",
            clients: [],
          });
          setFormErrors({});
        }}
        footer={[
          <button
            key="save"
            onClick={handleSubmit}
            className="bg-[#234E6F] text-white rounded-full px-5 py-2"
          >
            Save
          </button>,
        ]}
      >
        <form>
          <div className="mt-4">
            <label htmlFor="name">
              <span className="font-semibold">Client Group Name</span>
              <input
                className={`w-full border bg-white ${
                  formErrors.name ? "border-red-500" : "border-neutral-400"
                } mt-1 py-2 rounded-md mb-3`}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  {formErrors.name}
                </p>
              )}
            </label>

            <span className="font-semibold">Add Clients</span>
            <div className="mt-2">
              {/* Dropdown to Select Client */}
              <select
                className="w-full border bg-white border-neutral-400 rounded-md py-2 mb-3"
                onChange={(e) => handleAddClient(e.target.value)}
              >
                <option value="">Select a Client</option>
                {availableClients.map((client, index) => (
                  <option key={index} value={client}>
                    {client}
                  </option>
                ))}
              </select>

              {/* Selected Clients */}
              <div>
                {formData.clients.map((client, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-neutral-300 rounded-md px-3 py-2 mb-2"
                  >
                    <span>{client}</span>
                    <button
                      onClick={() => handleRemoveClient(client)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {formErrors.clients && (
              <p className="text-red-500 text-sm -mt-2 mb-2">
                {formErrors.clients}
              </p>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientsDelivery;
