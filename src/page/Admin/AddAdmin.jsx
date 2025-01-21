import { Modal, Form, Input, Button, message } from "antd";
import { useAddUserMutation } from "../redux/api/userApi";

export const AddAdmin = ({ modal2Open, setModal2Open }) => {
  const [form] = Form.useForm();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleFinish = async (values) => {
    try {
      const response = await addUser(values).unwrap();
      message.success("Admin added successfully!");
      console.log("Response:", response);
      setModal2Open(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add admin. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title="Add Admin"
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
          onClick={() => form.submit()}
          loading={isLoading}
          className="rounded-full"
        >
          Add
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Admin Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input placeholder="Enter Admin Email" />
        </Form.Item>

        <Form.Item
          name="contactNo"
          label="Contact Number"
          rules={[
            { required: true, message: "Contact Number is required" },
            { pattern: /^\d+$/, message: "Contact Number must be numeric" },
          ]}
        >
          <Input placeholder="Enter Contact Number" />
        </Form.Item>

        <Form.Item
          name="password"
          label="New Admin Password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
