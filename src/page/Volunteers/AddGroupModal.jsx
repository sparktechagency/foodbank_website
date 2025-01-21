import { Modal, Form, Input, Select, Button, message } from "antd";
import React, { useState } from "react";
import {
  useAddVolunteerGroupMutation,
  useGetAllVolunteerQuery,
  useGetDriverWarehouseQuery,

} from "../redux/api/volunteerApi";

export const AddGroupModal = ({ modal2Open, setModal2Open }) => {
  const [addVolunteerGroup, { isLoading: isSubmitting }] = useAddVolunteerGroupMutation();
  const { data: allVolunteer, isLoading, error } = useGetDriverWarehouseQuery();
console.log(allVolunteer)
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    clients: [],
  });

  
  const clientOptions =
  allVolunteer?.data?.data?.map((volunteer) => ({
    label: `${volunteer.firstName} ${volunteer.lastName}`,
    value: volunteer._id,
  })) || [];
  
console.log(clientOptions)
  const handleClientChange = (selectedClientIds) => {
    setFormData((prevData) => ({
      ...prevData,
      clients: selectedClientIds,
    }));
    console.log("Selected Client IDs:", selectedClientIds);
  };

  const handleFinish = async (values) => {
    const data = {
      volunteerGroupName: values.groupName,
      volunteerType: values.volunteerType,
      volunteers: formData.clients,
    };

    try {
      const response = await addVolunteerGroup(data).unwrap();
      message.success("Volunteer group created successfully!");
      setModal2Open(false);
      form.resetFields();
      setFormData({ name: "", clients: [] });
      console.log("API Response:", response);
    } catch (error) {
      message.error("Failed to create volunteer group. Please try again.");
      console.error("API Error:", error);
    }
  };
//asdfjklsadffdsg
  return (
    <Modal
      title="Create New Volunteer Group"
      centered
      open={modal2Open}
      onCancel={() => {
        setModal2Open(false);
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
          label="Select Volunteer Type"
          rules={[{ required: true, message: "Please select a Volunteer Type" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="warehouse">Warehouse Volunteer</Select.Option>
            <Select.Option value="driver">Driver Volunteer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="clients"
          label="Add Volunteers"
          rules={[
            { required: true, message: "Please select at least one volunteer" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select Volunteers"
            options={clientOptions}
            onChange={handleClientChange}
            style={{ width: "100%" }}
            value={formData.clients}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
