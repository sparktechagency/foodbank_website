import { Avatar, Upload, Tabs, Input } from "antd";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      children: (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Edit Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <Input className="w-full rounded-sm py-2 " placeholder="User Name" defaultValue="Asadujjaman" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input className="w-full rounded-sm py-2 " placeholder="Email" defaultValue="asadujjaman@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact No</label>
              <Input className="w-full rounded-sm py-2 " placeholder="Contact No" defaultValue="+99007007007" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input className="w-full rounded-sm py-2 " placeholder="Address" defaultValue="79/A Joker Vila, Gotham City" />
            </div>
            <div className="flex justify-center">
            <button  className="bg-[#02111E] text-white py-2 px-7 rounded mt-2">
              Save Change
            </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Change Your Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <Input.Password className="w-full rounded-sm py-2" placeholder="Old Password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input.Password className="w-full rounded-sm py-2" placeholder="New Password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <Input.Password className="w-full rounded-sm py-2" placeholder="Confirm Password" />
            </div>
            <div className="flex justify-center">
            <button  className="bg-[#02111E] text-white py-2 px-7 rounded mt-2">
              Save Change
            </button>
            </div>
          </div>
        </div>
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

      {/* Tabs Section */}
      <Tabs
      
        defaultActiveKey="1"
        items={tabItems}
        className="custom-tabs"
        
      />
      
    </div>
  );
};

export default Profile;
