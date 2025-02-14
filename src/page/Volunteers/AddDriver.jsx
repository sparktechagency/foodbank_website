import { Modal, Form, Input, Select, Button, message } from "antd";
import { useState } from "react";
import { useClientAddMutation } from "../redux/api/clientApi";

export const AddDriver = ({ modal2Open, setModal2Open }) => {
  const [volunteerAdd] = useClientAddMutation(); // API mutation for adding a volunteer
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    // Construct payload
    const data = {
      firstName: values.first,
      lastName: values.last,
      email: values.email,
      phoneNo: values.number,
      alternativePhoneNo: values.alternateNumber,
      address: values.adress,
      volunteerType: values.Holocaust , 
      volunteerRole:"driver",
      status: "driver", 
    };

    console.log("Payload being sent:", data);

    try {
      const response = await volunteerAdd(data).unwrap();
      console.log("API Response:", response);
      message.success(response.message );
      setModal2Open(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding volunteer:", error);
      message.error(error.data?.message);
    }
  };

  return (
    <Modal
      title="Add Volunteers"
      centered
      open={modal2Open}
      onCancel={() => {
        setModal2Open(false);
        form.resetFields();
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
        <Form.Item name="alternateNumber" label="Alternate Phone Number " rules={[
            { required: true, message: "alternative Phone Number is required" },
        
          ]}>
              <Input placeholder="Enter Alternate Phone Number" />
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
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="volunteerRole"
          label="Select Your Preferred Volunteer Role"
          rules={[{ required: true, message: "Please select Role" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="1">Driver</Select.Option>
            <Select.Option value="2">Warehouse</Select.Option>
            <Select.Option value="3">Both</Select.Option>
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
