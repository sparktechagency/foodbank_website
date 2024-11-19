import React from "react";
import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import { Menu } from "antd";
import logo from "../../assets/header/logo.png";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file

const items = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <img src={dashboard} alt="Dashboard" className="w-5 h-5" />,
  },
  {
    key: "userManagement",
    label: <Link to="/dashboard/UserManagement">User Management</Link>,
    icon: <img src={user} alt="User Management" className="w-5 h-5" />,
  },
  {
    key: "creatorManagement",
    label: <Link to="/dashboard/CreatorManagement">Creator Management</Link>,
    icon: <img src={user} alt="Creator Management" className="w-5 h-5" />,
  },
  {
    key: "categoriesManagement",
    label: <Link to="/dashboard/CategoriesManagement">Categories Management</Link>,
    icon: <img src={categorie} alt="Categories Management" className="w-5 h-5" />,
    children: [
      {
        key: "categories",
        label: <Link to="/dashboard/CategoriesManagement/Categories">Categories</Link>,
      },
      {
        key: "subcategory",
        label: <Link to="/dashboard/CategoriesManagement/Subcategory">Subcategory</Link>,
      },
    ],
  },
  {
    key: "subscription",
    label: <Link to="/dashboard/Subscription">Subscription</Link>,
    icon: <img src={subscription} alt="Subscription" className="w-5 h-5" />,
  },
  {
    key: "settings",
    label: <Link to="/dashboard/Settings">Settings</Link>,
    icon: <img src={settings} alt="Settings" className="w-5 h-5" />,
    children: [
      {
        key: "profile",
        label: <Link to="/dashboard/Settings/profile">Profile</Link>,
      },
      {
        key: "terms",
        label: <Link to="/dashboard/Settings/Terms&Condition">Terms & Condition</Link>,
      },
      {
        key: "privacy",
        label: <Link to="/dashboard/Settings/PrivacyPolicy">Privacy Policy</Link>,
      },
      {
        key: "faq",
        label: <Link to="/dashboard/Settings/FAQ">FAQ</Link>,
      },
    ],
  },
];

const SidBar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="custom-sidebar">
      {/* Logo */}
      <div className="custom-sidebar-logo">
        <img src={logo} alt="Logo" className="w-24" />
      </div>

      {/* Menu */}
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          border: "none",
        }}
        defaultSelectedKeys={["dashboard"]}
        theme="dark"
        mode="inline"
        items={items}
        className="custom-menu"
      />

      {/* Footer (Log Out) */}
      <div className="custom-sidebar-footer">
        <button>Log Out</button>
      </div>
    </div>
  );
};

export default SidBar;
