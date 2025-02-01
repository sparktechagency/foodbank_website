import { Form, Input, message } from "antd";


import Logo from "../assets/header/logo.png"
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../page/redux/api/userApi";
import { useState } from "react";

const ResetPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setIsLoading(true);
    console.log(values);
    
    const data = {
      email: localStorage.getItem("email"),
      resetPassword: values?.password,
    };
    console.log(data)
    resetPassword(data)
      .unwrap()
      .then((payload) => {
        message.success(payload?.message);
       
        navigate("/login");
      })
      .catch((error) => message.error(error?.data?.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="items-center px-4 justify-center flex min-h-screen ">
        <div className="">
          <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
          <div className="flex justify-center mb-4"><img src={Logo} alt="Logo" /></div>
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
              Set a new password
            </h2>
            <h3 className="text-[#333333] text-center mb-5">
              Create a new password. Ensure it differs from previous ones for
              security
            </h3>

            <Form
              name="reset-password"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please set your password!" },
                  {
                    min: 8,
                    max: 20,
                    message: "Password must be 8-10 characters long!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border  rounded-md"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border  rounded-md"
                />
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#234E6F] text-white rounded-md"
                >
                  Reset
                </button>
              </Form.Item>
            </Form>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
