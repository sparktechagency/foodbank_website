import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect } from "react";
import { useUpdateVolunteersMutation } from "../redux/api/volunteerApi";

export const EditAllVolunteerGroup = ({ client, setModal2Open1, isModalOpen }) => {
  const [form] = Form.useForm();
  const [updateVolunteers] = useUpdateVolunteersMutation();


  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        first: client?.firstName,
        last: client?.lastName,
        email: client?.email,
        number: client?.phoneNo,
       
        adress: client?.address,
        alternativePhoneNo: client?.alternativePhoneNo,
        Holocaust: client?.volunteerType ? "1" : "2", // Yes for true, No for false
        volunteerRole:
          client?.volunteerRole === "driver"
            ? "1"
            : client?.volunteerRole === "warehouse"
            ? "2"
            : "3", // Map volunteerRole to dropdown values
      });
    }
  }, [client, form]);

  const handleFinish = async (values) => {
    const data = {
      firstName: values?.first,
      lastName: values?.last,
      email: values?.email,
      phoneNo: values?.number,
      address: values?.adress,
      alternativePhoneNo: values?.alternativePhoneNo,
      volunteerType: values?.Holocaust === "1", 
      volunteerRole:
        values?.volunteerRole === "1"
          ? "driver"
          : values?.volunteerRole === "2"
          ? "warehouse"
          : "both",
          status:
          values?.volunteerRole === "1"
            ? "driver"
            : values?.volunteerRole === "2"
            && "warehouse",  // Map dropdown values to backend roles
    };

 

    try {
      const response = await updateVolunteers({ id: client?._id, data }).unwrap();
      message.success(response.message)
   
      setModal2Open1(false);
      form.resetFields();
    } catch (error) {

      message.error(error?.data?.message)
    }
  };

  return (
    <Modal
      title="Edit Volunteers"
      centered
      open={isModalOpen}
      onCancel={() => {
        setModal2Open1(false);
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
          rules={[
            { required: true, message: "Email Address is required" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item
          name="number"
          label="Phone Number"
          rules={[
            { required: true, message: "Phone Number is required" },
        
          ]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>
        <Form.Item
          name="alternativePhoneNo" label="Alternate Phone Number (Optional)"
         
        >
          <Input placeholder="Enter Phone Number" />
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
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="2">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="volunteerRole"
          label="Select Your Preferred Volunteer Role"
          rules={[{ required: true, message: "Please select Role" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="1">Driver</Select.Option>
            <Select.Option value="2">Warehouse</Select.Option>
            {/* <Select.Option value="3">Both</Select.Option> */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
