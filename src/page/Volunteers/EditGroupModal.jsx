import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect } from "react";
import { useUpdateVolunteerGroupMutation } from "../redux/api/volunteerApi";

export const EditGroupModal = ({ isModalOpen, setModal2Open1, group }) => {
  console.log(group)
  const [form] = Form.useForm();
  const [updateVolunteerGroup, { isLoading: isSubmitting }] =
    useUpdateVolunteerGroupMutation();

  // Pre-fill form values when the modal opens
  useEffect(() => {
    if (group) {
      console.log(group)
      form.setFieldsValue({
        groupName: group.volunteerGroupName,
        volunteerType: group.volunteerType,
        clients: group.volunteers?.map((volunteer) => volunteer._id),
      });
    }
  }, [group, form]);

  const handleFinish = async (values) => {
    const res = group?.volunteers.map((client) => client._id);
    console.log(res);
    const data = {
      volunteerGroupName: values.groupName,
      volunteerType: values.volunteerType,
      volunteers:res
    };
    
    console.log(data)

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
          name="volunteerType"
          label="Select Volunteer Type"
          rules={[{ required: true, message: "Please select a Volunteer Type" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="warehouse">Warehouse Volunteer</Select.Option>
            <Select.Option value="driver">Driver Volunteer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="clients"
          label="Volunteers Name"
        >
          <Select
            mode="multiple"
            options={group?.volunteers?.map((volunteer) => ({
              label: `${volunteer.firstName} ${volunteer.lastName}`,
              value: volunteer._id,
            }))}
            style={{ width: "100%" }}
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
