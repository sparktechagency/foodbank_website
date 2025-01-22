import { useState } from "react";
import { Avatar, Upload, Form, Input, Button } from "antd";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form layout="vertical" onFinish={(values) => console.log("Edit Profile:", values)}>
          <h2 className="text-xl font-semibold mb-4 text-center">Edit Your Profile</h2>
          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            initialValue="user@example.com"
          >
            <Input placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name="contactNo"
            label="Contact No."
            rules={[{ required: true, message: "Please enter your contact number!" }]}
          >
            <Input placeholder="Contact No" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Address" />
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
      content: (
        <Form layout="vertical" onFinish={(values) => console.log("Change Password:", values)}>
          <h2 className="text-xl font-semibold mb-4 text-center">Change Your Password</h2>

          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password!" }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 rounded-lg p-6">
      {/* Profile Picture Section */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <Avatar
            size={140}
            src={profilePic ? URL.createObjectURL(profilePic) : undefined}
            className="border-4 border-gray-300 shadow-lg"
          />
          {activeTab === "1" && (
            <Upload
              showUploadList={false}
              onChange={handleProfilePicUpload}
              className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <FaCamera className="text-gray-600 w-5 h-5" />
            </Upload>
          )}
        </div>
        <p className="text-lg font-semibold mt-4">{"Loading..."}</p>
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
