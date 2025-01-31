import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect } from "react";
import { useGetDriverWarehouseQuery, useUpdateVolunteerGroupMutation } from "../redux/api/volunteerApi";

export const EditGroupModal = ({ isModalOpen, setModal2Open1, group }) => {
  console.log(group?.types)
  const [form] = Form.useForm(); 
  const [updateVolunteerGroup, { isLoading: isSubmitting }] =
    useUpdateVolunteerGroupMutation();
const { data: allVolunteer, isLoading, error } = useGetDriverWarehouseQuery({limit:5000});

const clientOptions =
  allVolunteer?.data?.data?.map((volunteer) => ({
    label: `${volunteer.firstName} ${volunteer.lastName}`,
    value: volunteer._id,
  })) || [];
  console.log(clientOptions)


  // Pre-fill form values when the modal opens
  useEffect(() => {
    if (group) {
      console.log('-----------------',group)
      form.setFieldsValue({
        groupName: group.groupName,
        types: group?.types,
        clients: group.clients?.map((volunteer) => volunteer._id),
      });
    }
  }, [group, form]);

  const handleFinish = async (values) => {
    const res = group?.clients.map((client) => client._id);
    console.log(res);
    const data = {
      groupName: values.groupName,
      types: values.types,
      clients:values.clients,
      

      
    };
    
    console.log('=========================',data)

    try {
      const response = await updateVolunteerGroup({ id: group?._id, data }).unwrap();
      message.success("Volunteer group updated successfully!");
      setModal2Open1(false);
      console.log("Update Response:", response);
    } catch (error) {
      message.error("Failed to update volunteer group. Please try again.");
      console.error("Update Error:", error);
    }
  };

  return (
    <Modal
      title="Edit Volunteer Group"
      centered
      open={isModalOpen}
      onCancel={() => {
        setModal2Open1(false);
        form.resetFields();
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
          name="types"
          label="Select Volunteer Type"
          rules={[{ required: true, message: "Please select a Volunteer Type" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="warehouse">Warehouse Volunteer</Select.Option>
            <Select.Option value="driver">Driver Volunteer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="clients" label="Volunteers Name">
  <Select
    mode="multiple"
    options={clientOptions} // Use all fetched volunteers as options
    defaultValue={group?.clients?.map((volunteer) => volunteer._id)} // Set existing clients as default
    style={{ width: "100%" }}
    placeholder="Select Volunteers"
  />
</Form.Item>

      </Form>
    </Modal>
  );
};
