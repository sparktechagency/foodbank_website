import { Modal, Form, Input, Button, Checkbox } from 'antd';
import React, { useState } from 'react';

export const EditClientDeliveryGroup = ({ modalOpen1, setModalOpen1 }) => {
  const availableClients = [
    "Alena Artmyeva",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ];

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
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
    setModalOpen1(false);
    form.resetFields();
    setFormData({ name: "", clients: [] });
  };

  return (
    <div>
      <Modal
        title="Edit Client Group"
        centered
        open={modalOpen1}
        onCancel={() => {
          setModalOpen1(false);
          form.resetFields();
          setFormData({ name: "", clients: [] });
        }}
        bodyStyle={{
          maxHeight: "50vh",
          overflowY: "auto",
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
            name="name"
            label="Client Group Name"
            rules={[{ required: true, message: "Client Group Name is required" }]}
          >
            <Input placeholder="Enter Client Group Name" />
          </Form.Item>

          <Form.Item label="Add Clients">
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
    </div>
  );
};
