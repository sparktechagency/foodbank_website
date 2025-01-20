import { Modal, Form, Input, Button, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { useUpdateClientGroupMutation } from "../../page/redux/api/clientApi";

export const EditClientDeliveryGroup = ({
  isModalOpen,
  setEditModal,
  group,
}) => {
  const [form] = Form.useForm();

  const [updateClientGroup] = useUpdateClientGroupMutation();
  const [formData, setFormData] = useState({
    name: group?.clientGroupName || "",
    clients: group?.clients || [],
  });

  useEffect(() => {
    if (isModalOpen && group) {
      setFormData({
        name: group?.clientGroupName,
        clients: group?.clients,
      });
      form.setFieldsValue({
        name: group?.clientGroupName,
      });
    }
  }, [isModalOpen, group, form]);

  const handleFinish = (values) => {
    console.log(values);
    const res = group?.clients.map((client) => client._id);
    console.log(res);
    const data = {
      clientGroupName: values?.name,
      clients: res,
    };

    console.log(group?._id);

    updateClientGroup({ id: group?._id, data })
      .unwrap()
      .then((response) => {
        console.log(response);
        message.success(response?.message);
        setEditModal({ isOpen: false, id: null });
      })
      .catch((error) => {
        console.error("Error updating client group:", error);
        message.error(error?.data?.message || "Failed to update client group");
      });
  };

  return (
    <div>
      <Modal
        title="Edit Client Group"
        centered
        open={isModalOpen}
        onCancel={() => setEditModal({ isOpen: false, id: null })}
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
            rules={[
              { required: true, message: "Client Group Name is required" },
            ]}
          >
            <Input
              placeholder="Enter Client Group Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Form.Item>

          <Form.Item label="Clients in Group">
            <Select
              mode="multiple"
              disabled
              style={{
                width: "100%",
              }}
              placeholder="Select Clients"
              value={formData.clients.map(
                (client) => `${client.firstName} ${client.lastName}`
              )} // Display client names
              options={formData.clients.map((client) => ({
                label: `${client.firstName} ${client.lastName}`,
                value: client._id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
