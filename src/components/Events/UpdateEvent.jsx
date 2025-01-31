import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  TimePicker,
  message,
} from "antd";
import React, { useEffect } from "react";
import { MdAccessTime } from "react-icons/md";
import { useUpdateEventMutation } from "../../page/redux/api/eventApi";
import dayjs from "dayjs";

export const UpdateEvent = ({ isModalOpen, setModal2Open1, event }) => {
  const [form] = Form.useForm();
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  // Set default values whenever the modal opens or the `event` changes
  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        name: event.eventName || "",
        type: event.eventType || "",
        location: event.location || "",
        date: event.dayOfEvent ? dayjs(event.dayOfEvent) : null,
        timeFrom: event.startOfEvent
          ? dayjs(event.startOfEvent, "h:mm A")
          : null,
        timeTo: event.endOfEvent ? dayjs(event.endOfEvent, "h:mm A") : null,
        deliveryDrivers: event.deliveryNeeded?.toString() || "",
        warehouseVolunteers: event.warehouseNeeded?.toString() || "",
        message: event.messageDeliveryDriver || "",
        volunteer: event.messageWarehouseVolunteer || "",
      });
    }
  }, [event, isModalOpen]);

  const handleFinish = async (values) => {
    // Prepare the data for updating the event
    const data = {
      eventName: values.name,
      eventType: values.type,
      location: values.location,
      messageDeliveryDriver: values.message,
      messageWarehouseVolunteer: values.volunteer,
      dayOfEvent: values.date.format("YYYY-MM-DD"),
      startOfEvent: values.timeFrom.format("h:mm A"),
      endOfEvent: values.timeTo.format("h:mm A"),
      deliveryNeeded: parseInt(values.deliveryDrivers),
      warehouseNeeded: parseInt(values.warehouseVolunteers),
    };

    try {
      const response = await updateEvent({ id: event._id, data }).unwrap();
      message.success(response.message || "Event updated successfully!");
      form.resetFields();
      setModal2Open1(false);
    } catch (error) {
      message.error(
        error.data?.message || "Failed to update event. Please try again."
      );
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setModal2Open1(false);
  };

  return (
    <Modal
      title="Update Event"
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
            <Select.Option value="MitzvahSunday">Mitzvah Sunday</Select.Option>
            <Select.Option value="HolidayDrive">Holiday Drive</Select.Option>
            <Select.Option value="PersonalShopper">
              Personal Shopper
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Location is required" }]}
        >
          <Input placeholder="Enter Location" />
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

        <div className="border rounded-md border-neutral-400 p-3 mb-3">
          <h1 className="flex items-center font-semibold border-b pb-2">
            <MdAccessTime className="text-lg mr-2" /> Date & Time
          </h1>
          <Form.Item
            name="date"
            label="On"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker className="w-full" format="MM-DD-YYYY" />
          </Form.Item>

          <Form.Item
            name="timeFrom"
            label="From"
            rules={[{ required: true, message: "Start Time is required" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              placeholder="Select Time"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="timeTo"
            label="To"
            rules={[{ required: true, message: "End Time is required" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              placeholder="Select Time"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="deliveryDrivers"
          label="Delivery Drivers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter number of drivers" />
        </Form.Item>

        <Form.Item
          name="warehouseVolunteers"
          label="Warehouse Volunteers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter number of warehouse volunteers" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#234E6F] text-white rounded-full"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
