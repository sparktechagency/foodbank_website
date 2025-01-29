import { useState, useEffect } from "react";
import { Avatar, Upload, Form, Input, Button, message } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import {
  useGetSuperAdminQuery,
  useUpdateProfileMutation,
  
} from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const { data: adminProfile, isLoading } = useGetSuperAdminQuery();
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (adminProfile?.data) {
      form.setFieldsValue({
        first: adminProfile.data.firstName,
        last: adminProfile.data.lastName,
        email: adminProfile.data.email,
        contactNo: adminProfile.data.contactNo,
      });
    }
  }, [adminProfile, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const id = adminProfile?.data?._id;

  const handleProfileUpdate = async (values) => {
    console.log(values);
    try {
      const data = new FormData();
      data.append("firstName", values.first);
      data.append("lastName", values.last);
      data.append("contactNo", values.contactNo);
      data.append("role", adminProfile?.data?.role);
      data.append("status", adminProfile?.data?.status);
      if (image) {
        data.append("file", image);
      }
      const jsonObject = {};
      data.forEach((value, key) => {
        jsonObject[key] = value instanceof File ? value.name : value; 
      });
      
      console.log("FormData as JSON:", JSON.stringify(jsonObject, null, 2));
      
      const response = await updateProfile({ id, data }).unwrap();
      console.log(response);
      message.success(response.message);
    } catch (error) {
      message.error(error?.data?.message || "Failed to update profile.");
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleProfileUpdate} // Call the update function
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Your Profile
          </h2>
          <Form.Item
            name="first"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last"
            label="Last Name"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ type: "email", message: "Invalid email format!" }]}
          >
            <Input placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name="contactNo"
            label="Contact No."
            rules={[
              { required: true, message: "Please enter your contact number!" },
            ]}
          >
            <Input placeholder="Contact No" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab adminProfile={adminProfile} />,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 rounded-lg p-6">
      {/* Profile Picture Section */}
      <div className="text-center mb-6">
        <div className="relative w-[140px] h-[124px] mx-auto">
          <input
            type="file"
            onChange={handleImageChange}
            id="img"
            style={{ display: "none" }}
          />
          <img
            style={{ width: 140, height: 140, borderRadius: "100%" }}
            src={`${
              image
                ? URL.createObjectURL(image)
                : `${imageUrl}/${adminProfile?.data?.profilePicture}`
            }`}
            alt="Admin Profile"
          />
          {activeTab === "1" && (
            <label
              htmlFor="img"
              className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <IoCameraOutline className="text-black " />
            </label>
          )}
        </div>

        <p className="text-lg font-semibold mt-4">
          {isLoading ? "Loading..." : adminProfile?.data?.firstName}
        </p>
      </div>

      {/* Custom Tabs Section */}
      <div className="mb-4">
        <div className="flex space-x-6 justify-center mb-4">
          {tabItems.map((item) => (
            <button
              key={item.key}
              className={`py-2 font-medium ${
                activeTab === item.key
                  ? "border-b border-[#2F799E] text-[#2F799E]"
                  : "text-gray-600 hover:text-[#02111E]"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div>{tabItems.find((item) => item.key === activeTab)?.content}</div>
      </div>
    </div>
  );
};

export default Profile;
