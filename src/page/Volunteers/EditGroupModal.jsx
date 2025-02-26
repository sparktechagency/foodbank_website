import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetDriverWarehouseQuery,
  useUpdateVolunteerGroupMutation,
} from "../redux/api/volunteerApi";

export const EditGroupModal = ({ isModalOpen, setModal2Open1, group }) => {
  const [type, setSortOrder] = useState(""); 
 

  const [form] = Form.useForm();
  const [updateVolunteerGroup, { isLoading: isSubmitting }] =
    useUpdateVolunteerGroupMutation();

  const {
    data: allVolunteer,
    isLoading,
    error,
  } = useGetDriverWarehouseQuery({ limit: 5000, type: type });

  const clientOptions =
    allVolunteer?.data?.data?.map((volunteer) => ({
      label: `${volunteer.firstName} ${volunteer.lastName}`,
      value: volunteer._id,
    })) || [];


  useEffect(() => {
    if (group) {
   
      form.setFieldsValue({
        groupName: group.groupName,
        types: group?.types,
        clients: group.clients?.map((volunteer) => volunteer._id),
      });
      setSortOrder(group?.types); 
    }
  }, [group, form]);

  const handleFinish = async (values) => {
    const res = group?.clients.map((client) => client._id);
    
    const data = {
      groupName: values.groupName,
      types: values.types,
      clients: values.clients,
    };

    

    try {
      const response = await updateVolunteerGroup({
        id: group?._id,
        data,
      }).unwrap();
      message.success("Volunteer group updated successfully!");
      setModal2Open1(false);
  
    } catch (error) {
      message.error("Failed to update volunteer group. Please try again.");
   
    }
  };

  const handleShortChange = (value) => {
   
    setSortOrder(value); // Update the selected filter type
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
          <Select placeholder="Select" onChange={handleShortChange} value={type}>
            <Select.Option value="warehouse">Warehouse Volunteer</Select.Option>
            <Select.Option value="driver">Driver Volunteer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="clients" label="Volunteers Name">
          <Select
            mode="multiple"
            options={clientOptions} 
            defaultValue={group?.clients?.map((volunteer) => volunteer._id)} 
            style={{ width: "100%" }}
            placeholder="Select Volunteers"
            disabled={!type} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
