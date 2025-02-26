import { Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "../assets/header/logo.png";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";

const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state for submit button

  const onFinish = async (values) => {
    setLoading(true);
    try {
     
      const payload = await loginAdmin(values).unwrap();
    
      if (payload?.success) {
        // localStorage.setItem("accessToken", payload?.data?.accessToken);
        dispatch(setToken(payload?.data?.accessToken))
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error(payload?.message || "Login failed!");
      }
    } catch (error) {
      
      message.error(error?.data?.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[1500px] m-auto">
        <div className="md:flex md:justify-center">
          <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="h-12" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Sign in to your account
            </h2>

            <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" layout="vertical">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input placeholder="Enter your Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <div className="flex items-center justify-between mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-700">Remember me</Checkbox>
                </Form.Item>
                <Link to={"/forgetpassword"} className="text-sm text-[#2F799E] hover:underline">
                  Forget password?
                </Link>
              </div>

              <Form.Item>
                <button
                  type="submit"
                  className={`w-full py-2 bg-[#234E6F] text-white rounded focus:ring-2 focus:ring-gray-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Submit"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
