import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaRegHandPaper,
  FaRegUser,
  FaRegUserCircle,
} from "react-icons/fa";

import { useState } from "react";
import { Drawer, Radio, Space } from "antd";

import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";

import { FaChevronRight } from "react-icons/fa";
import UseAdminProfile from "../../hook/UseAdminProfile";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineBarChart } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";

const items = [
  {
    key: "events",
    label: "events",
    icon: <MdOutlineBarChart />,
    link: "/",
  },
  {
    key: "clients",
    label: "Clients",
    icon: <TbUsers />,
    link: "/clients",
  },
  {
    key: "volunteers",
    label: "Volunteers",
    icon: <FaRegHandPaper />,
    link: "/volunteers",
  },
  // {
  //   key: "categoriesManagement",
  //   label: "Categories Management",
  //   icon: categorie,
  //   link: "/dashboard/CategoriesManagement/Categories",
  //   children: [
  //     {
  //       key: "categoriesManagement",
  //       label: "Categories",
  //       link: "/dashboard/CategoriesManagement/Categories",
  //     },
  //     {
  //       key: "subcategory",
  //       label: "Subcategory",
  //       link: "/dashboard/CategoriesManagement/Subcategory",
  //     },
  //   ],
  // },
  {
    key: "admin",
    label: "Admin",
    icon: <CgNotes />,
    link: "/admin",
  },
  // {
  //   key: "profile",
  //   label: "Settings",
  //   icon: settings,
  //   link: "/dashboard/Settings/profile",
  //   children: [
  //     {
  //       key: "profile",
  //       label: "Profile",
  //       link: "/dashboard/Settings/profile",
  //     },
  //     {
  //       key: "terms",
  //       label: "Terms & Condition",
  //       link: "/dashboard/Settings/Terms&Condition",
  //     },
  //     {
  //       key: "privacy",
  //       label: "Privacy Policy",
  //       link: "/dashboard/Settings/PrivacyPolicy",
  //     },
  //     {
  //       key: "faq",
  //       label: "FAQ",
  //       link: "/dashboard/Settings/FAQ",
  //     },
  //     {
  //       key: "about",
  //       label: "About Us",
  //       link: "/dashboard/Settings/aboutUs",
  //     },
  //   ],
  // },
];

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();
  const [admin] = UseAdminProfile();

  console.log(admin);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const onClick = (key) => {
    setSelectedKey(key);
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="bg-[#f7f7f7] text-black py-3">
      <div className="flex justify-between">
        <div className="lg:hidden ">
          <div className="py-3 pl-4">
            <div onClick={showDrawer} className="text-3xl ">
              <FaBars />
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-8 p-1 ">
          <div className="relative">
            <Space>
              <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            </Space>

            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
            >
              <div className="custom-sidebar h-full ">
                {/* Logo */}
                <div className="custom-sidebar-logo flex justify-center pt-5">
                  <img src={logo} alt="Logo" className="w-[180px]" />
                </div>

                {/* Sidebar Menu */}
                <div className="menu-items pt-5">
                  {items.map((item) => (
                    <div key={item.key}>
                      {/* Render Parent Item */}
                      <Link
                        to={item.link}
                        className={`menu-item my-4  py-2  flex items-center cursor-pointer ${
                          selectedKey === item.key
                            ? "text-blue-600 rounded-md"
                            : "hover:text-blue-700"
                        }`}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            onParentClick(item.key);
                          } else {
                            setSelectedKey(item.key);
                            onClose(); // C
                          }
                        }}
                      >
                        <p className="w-5 h-5 mr-3 mt-1">{item.icon}</p>
                        <span className="block w-full">{item.label}</span>

                        {item.children && (
                          <FaChevronRight
                            className={`ml-auto transform transition-all duration-300 ${
                              expandedKeys.includes(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Footer (Log Out) */}
                <div className="custom-sidebar-footer absolute bottom-0 w-full lg:p-4">
                  <div className="dropdown dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="w-full flex  text-start  text-black lg:p-3 mb-5"
                    >
                      <span className="text-2xl">
                        <FaRegUserCircle />
                      </span>
                      <span className="ml-3">Asher Fahim</span>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white text-black z-[1]  w-52 p-2 -top-[95px] shadow"
                    >
                      <li>
                        <button onClick={handleLogout}>
                          <span className="text-2xl">
                            <IoIosLogIn />
                          </span>
                          <span className="ml-3">Log Out</span>
                        </button>
                      </li>
                      <li>
                        <Link to={"/profile"}>
                          <span className="text-2xl">
                            <FaRegUser />
                          </span>
                          <span className="ml-3">Profile</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>

          <div className=" mt-2">
            <img src={logo} alt="Logo" className="w-[180px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
