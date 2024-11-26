import { useState, useEffect } from "react";
import { Avatar, Upload } from "antd";
import { FaCamera } from "react-icons/fa";
import UseAdminProfile from "../../hook/UseAdminProfile";
import UseAxios from "../../hook/UseAxios";
import Swal from "sweetalert2";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const [admin, isLoading, refetch] = UseAdminProfile();
  const axiosUrl = UseAxios();

  const [formData, setFormData] = useState({
    username: '',
    contactNo: '',
    address: ''
  });

  // Update form data when admin data is loaded
  useEffect(() => {
    if (admin) {
      setFormData({
        username: admin?.user?.name || '',
        contactNo: admin?.user?.contact || '',
        address: admin?.user?.address || ''
      });
    }
  }, [admin]);

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosUrl.put('/dashboard/update', {
        name: formData.username,
        contact: formData.contactNo,
        address: formData.address
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
          confirmButtonColor: '#02111E'
        });
        // Optionally refetch the profile data to refresh
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await axiosUrl.put('/dashboard/update-password', {
        currentPassword: formData.get("currentPassword"),
        newPassword: newPassword
      });

      if (response.status === 200) {
        alert("Password updated successfully!");
        form.reset();
      }
    } catch (error) {
      console.error('Password update failed:', error);
      alert('Failed to update password. Please try again.');
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <form onSubmit={handleProfileUpdate}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Your Profile</h2>
            <div className="space-y-6">
              <div className="form-group">
                <label className="" htmlFor="username">User Name</label>
                <input
                  type="text"
                  name="username"
                  className="w-full rounded-sm p-2 mt-2 border"
                  id="username"
                  placeholder="User Name"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded-sm p-2 mt-2 border bg-gray-200"
                  placeholder="Email"
                  defaultValue={admin?.auth?.email || ""}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNo">Contact No.</label>
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  className="w-full rounded-sm p-2 mt-2 border"
                  placeholder="Contact No"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full rounded-sm p-2 mt-2 border"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="mt-2 bg-[#02111E] px-5 py-3 rounded text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: (
        <form onSubmit={handlePasswordSubmit}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Change Your Password</h2>
            <div className="space-y-6">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="w-full rounded-sm p-2 mt-2 border"
                  placeholder="Old Password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="w-full rounded-sm p-2 mt-2 border"
                  placeholder="New Password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full rounded-sm p-2 mt-2 border"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="mt-2 bg-[#02111E] px-5 py-3 rounded text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
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
        <p className="text-lg font-semibold mt-4">{admin?.user?.name || "Loading..."}</p>
      </div>

      {/* Custom Tabs Section */}
      <div className="mb-4">
        <div className="flex space-x-6 justify-center mb-4">
          {tabItems.map((item) => (
            <button
              key={item.key}
              className={`py-2 font-medium ${activeTab === item.key ? "border-b border-red-500 text-red-500" : "text-gray-600 hover:text-[#02111E]"}`}
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