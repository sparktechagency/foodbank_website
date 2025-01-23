import { Modal, Form, Input, Select, Button } from "antd";
import React from "react";
import { useClientAddMutation } from "../redux/api/clientApi";

export const AddClientModal = ({ modal2Open, setModal2Open }) => {
  const [form] = Form.useForm();

  const [addClient] = useClientAddMutation();

  const handleFinish = async (values) => {
    console.log(values)
    const clientData = {
      firstName: values.first,
      lastName: values.last,
      phoneNo: values.number,
      email: values.email,
      alternativePhoneNo: values.alternateNumber,
      address: values.address,
      apartment: values.apartment,
      city: values.city,
      state: values.state,
      zipCode: values.zipcode,
      peopleHousehold: values.household,
      dietaryRestrictions: values.dietary,
      deliveryInstructions: values.deliveryIns,
      clientDeliveryGroup: values.clientDeliveryGroup,
      holocaustSurvivor: values.Holocaust,
      dateOfBirth: values.date,
      badgeNumber: values.bags,
      status: "client",
    };

    try {
      await addClient(clientData).unwrap();
      console.log("Client added successfully", clientData);
      setModal2Open(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Add Client"
        centered
        open={modal2Open}
        onCancel={() => {
          setModal2Open(false);
          form.resetFields();
        }}
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
        footer={[
          <Button
            key="save"
            type="primary"
            onClick={() => form.submit()}
            className="rounded-full"
          >
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="mt-4">
            <div className="flex gap-3">
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
            </div>

            <Form.Item
              name="Holocaust"
              label="Holocaust Survivor"
              rules={[{ required: true, message: "Holocaust is required" }]}
            >
              <Input placeholder="Enter Holocaust" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Holocaust is required" }]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>


            <Form.Item
              name="date"
              label="Date of Birth"
              rules={[{ required: true, message: "Date of Birth is required" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="number"
              label="Phone Number"
              rules={[{ required: true, message: "Phone Number is required" }]}
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>

            <Form.Item name="alternateNumber" label="Alternate Phone Number">
              <Input placeholder="Enter Alternate Phone Number" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item name="apartment" label="Apartment, suite, etc.">
              <Input placeholder="Enter Apartment Details" />
            </Form.Item>
          </div>

          <div className="flex gap-3">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input placeholder="Enter City Name" />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Input placeholder="Enter State Name" />
            </Form.Item>

            <Form.Item
              name="zipcode"
              label="Zipcode"
              rules={[{ required: true, message: "Zipcode is required" }]}
            >
              <Input placeholder="Enter ZipCode Name" />
            </Form.Item>
          </div>

          <div className="lg:flex gap-3 mt-3">
            <Form.Item
              name="household"
              label="Number of People in Household"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Enter household" />
            </Form.Item>

            <Form.Item
              name="bags"
              label="Number of Bags"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Enter bags" />
            </Form.Item>
          </div>

          <Form.Item name="dietary" label="Dietary Restrictions">
            <Input placeholder="Enter Dietary Restrictions" />
          </Form.Item>

          <Form.Item name="deliveryIns" label="Delivery Instructions">
            <Input placeholder="Enter Delivery Instructions" />
          </Form.Item>

          <Form.Item name="clientDeliveryGroup" label="Delivery Drivers Group">
            <Input placeholder="Enter deliveryDrivers" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
