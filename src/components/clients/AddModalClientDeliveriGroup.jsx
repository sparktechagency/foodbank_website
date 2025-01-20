import { Modal, Form, Input, Button, Select, message } from "antd";
import React, { useState } from "react";
import { useClientGroupAddMutation, useGetClientQuery } from "../../page/redux/api/clientApi";

export const AddModalClientDeliveriGroup = ({ modalOpen, setModalOpen }) => {
  const { data: clientData } = useGetClientQuery();
  const [addClientGroup] = useClientGroupAddMutation();

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    clients: [], // Array of selected client IDs
  });

  // Transform API data into options suitable for the Select component
  const clientOptions = clientData?.data?.map((client) => ({
    label: `${client.firstName} ${client.lastName}`,
    value: client._id, // Use client ID as the value
  })) || [];

  const handleClientChange = (selectedClientIds) => {
    setFormData((prevData) => ({
      ...prevData,
      clients: selectedClientIds,
    }));
    console.log("Selected Client IDs:", selectedClientIds);
  };

  const handleFinish = async (values) => {
    const postData = {
      clientGroupName: values.name, // Form field for group name
      clients: formData.clients, // Selected client IDs
    };

    try {
      const response = await addClientGroup(postData).unwrap();
      message.success(response?.message || "Client group created successfully!");
      console.log("POST Response:", response);

      // Reset form and state after successful POST
      setModalOpen(false);
      form.resetFields();
      setFormData({ name: "", clients: [] });
    } catch (error) {
      message.error(error?.data?.message || "Failed to create client group.");
      console.error("POST Error:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Create New Client Group"
        centered
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
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

          <Form.Item
            name="clients"
            label="Add Clients"
            rules={[{ required: true, message: "Please select at least one client" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select Clients"
              options={clientOptions}
              onChange={handleClientChange}
              style={{ width: "100%" }}
              value={formData.clients}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
