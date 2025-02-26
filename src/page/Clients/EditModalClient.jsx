import { Modal, Form, Input, Select, Button } from "antd";

export const EditModalClient = ({ isModalOpen, client, setModal2Open1 }) => {
  const [form] = Form.useForm();


  const handleFinish = (values) => {
 
    setModal2Open1(false);
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
            className="rounded-full"
            onClick={() => form.submit()}
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
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
              </Select>
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
            <Form.Item
              name="alternateNumber"
              label="Alternate Phone Number"
            >
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
              name="apartment"
              label="Apartment, suite, etc."
            >
              <Input placeholder="Enter Apartment Details" />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Select placeholder="Select City">
                <Select.Option value="mitzvah day">Mitzvah Day</Select.Option>
                <Select.Option value="tujbah day">Tujbah Day</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Select placeholder="Select State">
                <Select.Option value="mitzvah day">Mitzvah Day</Select.Option>
                <Select.Option value="tujbah day">Tujbah Day</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="zipcode"
              label="Zipcode"
              rules={[{ required: true, message: "Zipcode is required" }]}
            >
              <Select placeholder="Select Zipcode">
                <Select.Option value="The Cupboard">The Cupboard</Select.Option>
                <Select.Option value="Tujbah Day">Tujbah Day</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="lg:flex gap-3 mt-3">
            <Form.Item
              name="household"
              label="Number of People in Household"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Select placeholder="Select">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="bags"
              label="Number of Bags"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Select placeholder="Select">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item name="deitary" label="Dietary Restrictions">
            <Input placeholder="Enter Dietary Restrictions" />
          </Form.Item>
          <Form.Item name="deliveryIns" label="Delivery Instructions">
            <Input placeholder="Enter Delivery Instructions" />
          </Form.Item>
          <Form.Item
            name="deliveryDrivers"
            label="Delivery Drivers Needed"
          >
            <Select placeholder="Select">
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
