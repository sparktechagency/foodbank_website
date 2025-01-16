import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useGetSingleDataQuery, useUpdateClientMutation } from '../redux/api/clientApi';

export const EditClienModalSec = ({ isModalOpen, client, setModal2Open1 }) => {
  const id = client?.id;
  const [updateClient] = useUpdateClientMutation();
  const [form] = Form.useForm();
  const { data: singleData, isLoading } = useGetSingleDataQuery({ id }, { skip: !id });

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        first: singleData.data.firstName,
        last: singleData.data.lastName,
        number: singleData.data.phoneNo,
        alternateNumber: singleData.data.alternativePhoneNo,
        address: singleData.data.address,
        apartment: singleData.data.apartment,
        city: singleData.data.city,
        state: singleData.data.state,
        zipcode: singleData.data.zipCode,
        household: singleData.data.peopleHousehold,
        dietary: singleData.data.dietaryRestrictions,
        deliveryIns: singleData.data.deliveryInstructions,
        clientDeliveryGroup: singleData.data.clientDeliveryGroup,
        Holocaust: singleData.data.holocaustSurvivor,
        date: singleData.data.dateOfBirth,
      });
    }
  }, [singleData, form]);

  const handleFinish = async (values) => {
    const updatedClient = {
      firstName: values.first,
      lastName: values.last,
      phoneNo: values.number,
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
    };

    try {
      await updateClient({ id, data: updatedClient }).unwrap();
      console.log("Client updated successfully", updatedClient);
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
   
              >
                <Input placeholder="Enter First Name" />
              </Form.Item>
              <Form.Item
                name="last"
                label="Last Name"

              >
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </div>

            <Form.Item
              name="Holocaust"
              label="Holocaust Survivor"

            >
              <Input placeholder="Enter Holocaust" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date of Birth"
       
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="number"
              label="Phone Number"
            
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>

            <Form.Item name="alternateNumber" label="Alternate Phone Number">
              <Input placeholder="Enter Alternate Phone Number" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
            
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
       
            >
              <Input placeholder="Enter City Name" />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
           
            >
              <Input placeholder="Enter State Name" />
            </Form.Item>

            <Form.Item
              name="zipcode"
              label="Zipcode"
            
            >
              <Input placeholder="Enter ZipCode Name" />
            </Form.Item>
          </div>

          <div className="lg:flex gap-3 mt-3">
            <Form.Item
              name="household"
              label="Number of People in Household"
   
            >
              <Input placeholder="Enter household" />
            </Form.Item>

            <Form.Item
              name="bags"
              label="Number of Bags"
            
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
