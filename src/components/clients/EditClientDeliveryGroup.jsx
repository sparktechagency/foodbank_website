import { Modal, Form, Input, Button, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { useGetAddClientsQuery, useUpdateClientGroupMutation } from "../../page/redux/api/clientApi";

export const EditClientDeliveryGroup = ({ isModalOpen, setEditModal, group }) => {
  const [form] = Form.useForm();
  const { data: clients } = useGetAddClientsQuery();

  // Generate options for Select dropdown
  const clientOptions =
    clients?.data?.map((volunteer) => ({
      label: `${volunteer?.firstName} ${volunteer?.lastName}`,
      value: volunteer?._id,
    })) || [];



  const [updateClientGroup] = useUpdateClientGroupMutation();

  useEffect(() => {
    if (isModalOpen && group) {
      form.setFieldsValue({
        name: group?.groupName,
        clients: group?.clients?.map((client) => client?._id), // Set existing clients
      });
    }
  }, [isModalOpen, group, form]);

  const handleFinish = (values) => {
 
    const data = {
      groupName: values?.name,
      clients: values?.clients, // Selected clients' IDs
    };

    

    updateClientGroup({ id: group?._id, data })
      .unwrap()
      .then((response) => {
     
        message.success(response?.message);
        setEditModal({ isOpen: false, id: null });
      })
      .catch((error) => {
  
        message.error(error?.data?.message || "Failed to update client group");
      });
  };

  return (
    <Modal
      title="Edit Client Group"
      centered
      open={isModalOpen}
      onCancel={() => setEditModal({ isOpen: false, id: null })}
      footer={[
        <Button key="save" type="primary" className="rounded-full" onClick={() => form.submit()}>
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

        <Form.Item name="clients" label="Volunteers Name">
          <Select
            mode="multiple"
            options={clientOptions} // Show all available volunteers
            style={{ width: "100%" }}
            placeholder="Select Volunteers"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
