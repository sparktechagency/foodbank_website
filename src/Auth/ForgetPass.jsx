import { Form, Input } from "antd";

import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgetPass = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold flex justify-center mb-6 text-gray-800">
          <span className="text-[#004466] text-4xl mr-2">
          <IoIosArrowRoundBack />
          </span>
          <span>Forget Password</span>
        </h2>
        <h3 className="text-center text-[#333333] mb-5">Please enter your email address to reset
        your password.</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical" 
        >
          {/* Email Field */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 border border-[#02111E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Link to={'/verify'}>
            <button
              type="submit"
              className="w-full py-2 bg-[#02111E] text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
            >
              Send OTP
            </button></Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPass;
