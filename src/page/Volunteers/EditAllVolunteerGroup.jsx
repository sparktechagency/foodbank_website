import { Modal, Form, Input, Select, Button, Checkbox } from "antd";
import { useState } from "react";

export const EditAllVolunteerGroup = ({ modal2Open1, setModal2Open1 }) => {
  const [form] = Form.useForm();
  const availableClients = [
    "Alena Artmyeva",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ];
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    Holocaust: "",
    number: "",
    adress: "",
    clients: [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (client) => {
    if (formData.clients.includes(client)) {
      setFormData((prevData) => ({
        ...prevData,
        clients: prevData.clients.filter((c) => c !== client),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        clients: [...prevData.clients, client],
      }));
    }
  };

  const handleFinish = (values) => {
    console.log("Form Values:", { ...values, clients: formData.clients });
    setModal2Ope1n(false);
    form.resetFields();
    setFormData({ first: "", last: "", email: "", Holocaust: "", number: "", adress: "", clients: [] });
  };

  return (
    <Modal
      title="Edit Volunteers"
      centered
      open={modal2Open1}
      onCancel={() => {
        setModal2Open1(false);
        form.resetFields();
        setFormData({ first: "", last: "", email: "", Holocaust: "", number: "", adress: "", clients: [] });
      }}
      footer={[
        <Button
          key="save"
          type="primary"
          className="rounded-full"
          onClick={() => form.submit()}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="first"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          name="last"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[{ required: true, message: "Email Address is required" }]}
        >
          <Input placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item
          name="number"
          label="Phone Number"
          rules={[{ required: true, message: "Phone Number is required" }]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>

        <Form.Item
          name="adress"
          label="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder="Enter Address" />
        </Form.Item>

        <Form.Item
          name="Holocaust"
          label="Is the Volunteer a Vip"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="2">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Select Your Preferred Volunteer Role">
          <div
            className="border border-gray-300 rounded p-1 px-3 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {formData.clients.length > 0
              ? formData.clients.join(", ")
              : "Select Clients"}
          </div>
          {isDropdownOpen && (
            <div className="bg-white border border-gray-300 rounded mt-1 w-full p-2">
              {availableClients.map((client, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Checkbox
                    checked={formData.clients.includes(client)}
                    onChange={() => handleCheckboxChange(client)}
                  >
                    {client}
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
