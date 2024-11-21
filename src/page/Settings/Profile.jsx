import { useState } from "react";
import { Avatar, Upload, Input, Form,  message } from "antd";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    message.success("Profile updated successfully!");
  };

  const handlePasswordSubmit = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }
    console.log("Password Updated:", values);
    message.success("Password updated successfully!");
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form
          name="edit-profile"
          initialValues={{
            username: "Asadujjaman",
            email: "asadujjaman@gmail.com",
            contactNo: "+99007007007",
            address: "79/A Joker Vila, Gotham City",
          }}
          onFinish={handleFormSubmit}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Your Profile</h2>
            <div className="space-y-4">
              {/* Custom User Name Label */}
              <Form.Item
                name="username"
                label={<span className="">User Name</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "User name is required!" }]}
              >
                <Input className="w-full rounded-sm py-2" placeholder="User Name" />
              </Form.Item>
              
              {/* Custom Email Label */}
              <Form.Item
                name="email"
                label={<span className="">Email Address</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Email is required!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input className="w-full rounded-sm py-2" placeholder="Email" />
              </Form.Item>

              {/* Custom Contact Number Label */}
              <Form.Item
                name="contactNo"
                label={<span className="">Contact No.</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Contact number is required!" }]}
              >
                <Input className="w-full rounded-sm py-2" placeholder="Contact No" />
              </Form.Item>

              {/* Custom Address Label */}
              <Form.Item
                name="address"
                label={<span className="">Address</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Address is required!" }]}
              >
                <Input className="w-full rounded-sm py-2" placeholder="Address" />
              </Form.Item>

              <div className="flex justify-center">
                <button type="submit"  className="mt-2 bg-[#02111E] px-5 py-3 rounded text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: (
        <Form
          name="change-password"
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onFinish={handlePasswordSubmit}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Change Your Password</h2>
            <div className="space-y-4">
              {/* Custom Current Password Label */}
              <Form.Item
                name="currentPassword"
                label={<span className="">Current Password</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Current password is required!" }]}
              >
                <Input.Password className="w-full rounded-sm py-2" placeholder="Old Password" />
              </Form.Item>

              {/* Custom New Password Label */}
              <Form.Item
                name="newPassword"
                label={<span className="">New Password</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "New password is required!" }]}
              >
                <Input.Password className="w-full rounded-sm py-2" placeholder="New Password" />
              </Form.Item>

              {/* Custom Confirm Password Label */}
              <Form.Item
                name="confirmPassword"
                label={<span className=" ">Confirm New Password</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Please confirm your new password!" }]}
              >
                <Input.Password className="w-full rounded-sm py-2" placeholder="Confirm Password" />
              </Form.Item>

              <div className="flex justify-center">
              <button type="submit"  className="mt-2 bg-[#02111E] px-5 py-3 rounded text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg p-6">
      {/* Profile Picture Section */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <Avatar
            size={140}
            src={profilePic ? URL.createObjectURL(profilePic) : undefined}
            className="border-4 border-gray-300 shadow-lg"
          />
          <Upload
            showUploadList={false}
            onChange={handleProfilePicUpload}
            className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer"
          >
            <FaCamera className="text-gray-600 w-5 h-5" />
          </Upload>
        </div>
        <p className="text-lg font-semibold mt-4">Jenny Torn</p>
      </div>

      {/* Custom Tabs Section */}
      <div className="mb-4">
        <div className="flex space-x-6 justify-center mb-4">
          {tabItems.map((item) => (
            <button
              key={item.key}
              className={`py-2 font-medium ${
                activeTab === item.key ? "border-b border-red-500 text-red-500" : "text-gray-600 hover:text-[#02111E]"
              } transition`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>{tabItems.find((item) => item.key === activeTab)?.content}</div>
    </div>
  );
};

export default Profile;
