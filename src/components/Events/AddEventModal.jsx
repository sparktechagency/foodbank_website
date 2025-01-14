import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import React, { useState } from "react";
import { MdAccessTime } from "react-icons/md";

export const AddEventModal = ({ modal2Open, setModal2Open }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form Data:", values);

    // Reset form fields
    form.resetFields();

    // Close modal
    setModal2Open(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setModal2Open(false);
  };

  return (
    <Modal
      title="Add Event"
      centered
      open={modal2Open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: "",
          type: "",
          location: "",
          date: "",
          timeFrom: "",
          timeTo: "",
          deliveryDrivers: "",
          warehouseVolunteers: "",
          message: "",
          volunteer: "",
        }}
      >
        <Form.Item
          name="name"
          label="Event Name"
          rules={[{ required: true, message: "Event Name is required" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Event Type"
          rules={[{ required: true, message: "Event Type is required" }]}
        >
          <Select placeholder="Select Event Type">
            <Select.Option value="mitzvah day">Mitzvah Day</Select.Option>
            <Select.Option value="tujbah day">Tujbah Day</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Location is required" }]}
        >
          <Select placeholder="Select Location">
            <Select.Option value="The Cupboard">The Cupboard</Select.Option>
            <Select.Option value="Tujbah Day">Tujbah Day</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="message"
          label="Default Message to Delivery Driver"
          rules={[{ required: true, message: "Message is required" }]}
        >
          <Input placeholder="Enter default message" />
        </Form.Item>

        <Form.Item
          name="volunteer"
          label="Default Message to Warehouse Volunteer"
          rules={[{ required: true, message: "Message is required" }]}
        >
          <Input placeholder="Enter default message" />
        </Form.Item>

        <div className="border rounded-md border-neutral-400 p-3">
          <h1 className="flex items-center font-semibold border-b pb-2">
            <MdAccessTime className="text-lg mr-2" /> Date & Time
          </h1>

          <Form.Item
            name="date"
            label="On"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="timeFrom"
            label="From"
            rules={[{ required: true, message: "Start Time is required" }]}
          >
            <Select placeholder="Select Time">
              <Select.Option value="morning">Morning</Select.Option>
              <Select.Option value="afternoon">Afternoon</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeTo"
            label="To"
            rules={[{ required: true, message: "End Time is required" }]}
          >
            <Select placeholder="Select Time">
              <Select.Option value="evening">Evening</Select.Option>
              <Select.Option value="night">Night</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="deliveryDrivers"
          label="Delivery Drivers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Select placeholder="Select number of drivers">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="warehouseVolunteers"
          label="Warehouse Volunteers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Select placeholder="Select number of volunteers">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#234E6F] text-white rounded-full"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
