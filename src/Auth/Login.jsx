import { Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/header/logo.png";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
const Login = () => {
  const [ loginAdmin] = useLoginAdminMutation();
const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      console.log("Form Values:", values);
      const payload = await loginAdmin(values).unwrap();
      console.log("API Response:", payload);
      if (payload?.success === true) {
        localStorage.setItem("accessToken", payload?.data?.accessToken);
        message.success('success')
        navigate("/");
      } else {
        console.error("Login failed:", payload?.message);
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      console.log("Login attempt finished.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center  md:pt-0 px-4 justify-center ">
      <div className="  w-full max-w-[1500px] m-auto">
        <div className=" ">
          <div className="md:flex md:justify-center">
            <div className="bg-white  md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
              <div className="flex justify-center mb-4">
                <img src={Logo} alt="Logo" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Sign in to your account
              </h2>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
               
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-700">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    to={"/forgetpassword"}
                    className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                  >
                    Forget password?
                  </Link>
                </div>

                <Form.Item>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#234E6F] text-white rounded focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
