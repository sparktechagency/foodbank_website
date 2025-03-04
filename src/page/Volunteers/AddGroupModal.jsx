import { Modal, Form, Input, Select, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import {
  useAddVolunteerGroupMutation,
  useGetDriverWarehouseQuery,
} from "../redux/api/volunteerApi";

export const AddGroupModal = ({ modal2Open, setModal2Open }) => {
  const [type, setSortOrder] = useState(""); // Volunteer type state
  const [addVolunteerGroup, { isLoading: isSubmitting }] = useAddVolunteerGroupMutation();
  const { data: allVolunteer, isLoading, error } = useGetDriverWarehouseQuery({ limit: 5000, type: type });
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    clients: [],
  });

  const clientOptions =
    allVolunteer?.data?.data?.map((volunteer) => ({
      label: `${volunteer?.firstName} ${volunteer?.lastName}`,
      value: volunteer?._id,
    })) || [];

  const handleClientChange = (selectedClientIds) => {
    setFormData((prevData) => ({
      ...prevData,
      clients: selectedClientIds,
    }));
  
  };

  const handleFinish = async (values) => {
    const data = {
      groupName: values?.groupName,
      types: values?.volunteerType,
      clients: formData?.clients,
    };

    try {
      const response = await addVolunteerGroup(data).unwrap();
      message.success("Volunteer group created successfully!");
      setModal2Open(false);
      form.resetFields();
      setFormData({ name: "", clients: [] });
      setSortOrder(""); // Reset the volunteerType state
    
    } catch (error) {
      message.error("Failed to create volunteer group. Please try again.");
    
    }
  };

  const handleShortChange = (value) => {

    setSortOrder(value); // Update the selected filter type
  };

  useEffect(() => {
    // Reset form and state when modal is closed
    if (!modal2Open) {
      form.resetFields();
      setFormData({ name: "", clients: [] });
      setSortOrder(""); // Reset the volunteerType state
    }
  }, [modal2Open, form]);

  return (
    <Modal
      title="Create New Volunteer Group"
      centered
      open={modal2Open}
      onCancel={() => {
        setModal2Open(false);
        form.resetFields();
        setFormData({ name: "", clients: [] });
        setSortOrder(""); // Reset the volunteerType state
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
          loading={isSubmitting}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="groupName"
          label="Volunteer Group Name"
          rules={[{ required: true, message: "Volunteer Group Name is required" }]}
        >
          <Input placeholder="Enter Volunteer Group Name" />
        </Form.Item>

        <Form.Item
          name="volunteerType"
          onChange={handleShortChange}
          label="Select Volunteer Type"
          rules={[{ required: true, message: "Please select a Volunteer Type" }]}
        >
          <Select placeholder="Select" onChange={handleShortChange}>
            <Select.Option value="warehouse">Warehouse Volunteer</Select.Option>
            <Select.Option value="driver">Driver Volunteer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="clients"
          label="Add Volunteers"
          rules={[{ required: true, message: "Please select at least one volunteer" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select Volunteers"
            options={clientOptions}
            onChange={handleClientChange}
            style={{ width: "100%" }}
            value={formData.clients}
            disabled={!type} // Disable clients select if no volunteerType is selected
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
