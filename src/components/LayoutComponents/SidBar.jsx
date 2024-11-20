import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // Arrow icon

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: user,
    link: "/dashboard/UserManagement",
  },
  {
    key: "creatorManagement",
    label: "Creator Management",
    icon: user,
    link: "/dashboard/CreatorManagement",
  },
  {
    key: "categoriesManagement",
    label: "Categories Management",
    icon: categorie,
    link: "/dashboard/CategoriesManagement/Categories",
    children: [
      {
        key: "categoriesManagement",
        label: "Categories",
        link: "/dashboard/CategoriesManagement/Categories",
      },
      {
        key: "subcategory",
        label: "Subcategory",
        link: "/dashboard/CategoriesManagement/Subcategory",
      },
    ],
  },
  {
    key: "subscription",
    label: "Subscription",
    icon: subscription,
    link: "/dashboard/Subscription",
  },
  {
    key: "profile",
    label: "Settings",
    icon: settings,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]); // Track expanded keys

  // Toggle expand or collapse of items with children
  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const onClick = (key) => {
    setSelectedKey(key); // Update active item
  };

  return (
    <div className="custom-sidebar h-full bg-[#050505]">
      {/* Logo */}
      <div className="custom-sidebar-logo flex justify-center ">
        <img src={logo} alt="Logo" className="w-[160px]" />
      </div>

      {/* Sidebar Menu */}
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.key}>
            {/* Render Parent Item */}
            <Link
              to={item.link}
              className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                selectedKey === item.key
                  ? "bg-[#EDC4C5] rounded-md"
                  : "bg-white rounded-md hover:bg-gray-200"
              }`}
              onClick={() => {
                if (item.children) {
                  onParentClick(item.key); // Toggle the parent item expansion
                }
                onClick(item.key); // Update active item
              }}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" />
              <span className="block w-full text-black">{item.label}</span>

              {/* Arrow icon to toggle children */}
              {item.children && (
                <FaChevronRight
                  className={`ml-auto transform transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "rotate-90" : ""
                  }`}
                />
              )}
            </Link>

            {/* Render Children with Animation */}
            {item.children && expandedKeys.includes(item.key) && (
              <div className="overflow-hidden bg-white -my-2 mx-5 mb-4 text-black transition-all duration-300">
                {item.children.map((child) => (
                  <Link
                    key={child.key}
                    to={child.link}
                    className={`menu-item p-4 flex items-center cursor-pointer ${
                      selectedKey === child.key
                        ? "bg-[#EDC4C5]"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => onClick(child.key)}
                  >
                    <span className="block w-full text-black">{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer (Log Out) */}
      <div className="custom-sidebar-footer absolute bottom-0 w-full p-4 ">
        <button className="w-full bg-white rounded-md text-black p-3">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SidBar;
