import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import {
  useGetSingleDataQuery,
  useUpdateClientMutation,
} from "../redux/api/clientApi";

export const EditClienModalSec = ({ isModalOpen, client, setModal2Open1 }) => {
  const id = client?.id;
  console.log(client)
  const [updateClient] = useUpdateClientMutation();
  const [form] = Form.useForm();
  const { data: singleData, isLoading } = useGetSingleDataQuery(
    { id },
    { skip: !id }
  );

  useEffect(() => {
    if (singleData?.data?.filterClient) {
      form.setFieldsValue({
        first: singleData.data?.filterClient?.firstName,
        last: singleData.data?.filterClient?.lastName,
        number: singleData.data?.filterClient?.phoneNo,
        alternateNumber: singleData.data?.filterClient?.alternativePhoneNo,
        address: singleData.data?.filterClient?.address,
        apartment: singleData.data?.filterClient?.apartment,
        city: singleData.data?.filterClient?.city,
        state: singleData.data?.filterClient?.state,
        zipcode: singleData.data?.filterClient?.zipCode,
        badgeNumber: singleData.data?.filterClient?.badgeNumber,
        household: singleData.data?.filterClient?.peopleHousehold,
        dietary: singleData.data?.filterClient?.dietaryRestrictions,
        deliveryIns: singleData.data?.filterClient?.deliveryInstructions,
        clientDeliveryGroup: singleData.data?.filterClient?.clientDeliveryGroup,
        Holocaust: singleData.data?.filterClient?.holocaustSurvivor ? true : false, 
        date: singleData.data?.filterClient?.dateOfBirth,
      });
    }
  }, [singleData, form]);

  const handleFinish = async (values) => {
    console.log("values-------", values);
    const updatedClien = {
      firstName: values.first,
      lastName: values.last,
      phoneNo: values.number,
      alternativePhoneNo: values.alternateNumber,
      address: values.address,
      apartment: values.apartment,
      city: values.city,
      state: values.state,
      zipCode: values.zipcode,
      badgeNumber: values.badgeNumber,
      peopleHousehold: values.household,
      dietaryRestrictions: values.dietary,
      deliveryInstructions: values.deliveryIns,
      clientDeliveryGroup: values.clientDeliveryGroup,
      holocaustSurvivor: Boolean(values.Holocaust),
      dateOfBirth: values.date,
    };
    console.log(updatedClien);

    try {
      await updateClient({ id, data: updatedClien }).unwrap();
      console.log("Client updated successfully", updatedClien);
      setModal2Open1(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Edit Client"
        centered
        open={isModalOpen}
        onCancel={() => {
          setModal2Open1(false);
         
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
              <Form.Item name="first" label="First Name">
                <Input placeholder="Enter First Name" />
              </Form.Item>

              <Form.Item name="last" label="Last Name">
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </div>

            <Form.Item
              name="Holocaust"
              label="Holocaust"
              rules={[{ required: true, message: "Event Type is required" }]}
            >
              <Select placeholder="Select Event Type">
                <Select.Option value={true}>Yes</Select.Option>{" "}
                {/* Boolean true */}
                <Select.Option value={false}>No</Select.Option>{" "}
                {/* Boolean false */}
              </Select>
            </Form.Item>

            <Form.Item name="date" label="Date of Birth">
              <Input type="date" />
            </Form.Item>

            <Form.Item name="number" label="Phone Number">
              <Input placeholder="Enter Phone Number" />
            </Form.Item>

            <Form.Item name="alternateNumber" label="Alternate Phone Number">
              <Input placeholder="Enter Alternate Phone Number" />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item name="apartment" label="Apartment, suite, etc.">
              <Input placeholder="Enter Apartment Details" />
            </Form.Item>
          </div>

          <div className="flex gap-3">
            <Form.Item name="city" label="City">
              <Input placeholder="Enter City Name" />
            </Form.Item>

            <Form.Item name="state" label="State">
              <Input placeholder="Enter State Name" />
            </Form.Item>

            <Form.Item name="zipcode" label="Zipcode">
              <Input placeholder="Enter ZipCode Name" />
            </Form.Item>
          </div>

          <div className="lg:flex gap-3 mt-3">
            <Form.Item name="household" label="Number of People in Household">
              <Input placeholder="Enter household" />
            </Form.Item>

            <Form.Item name="badgeNumber" label="Number of Bags">
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
