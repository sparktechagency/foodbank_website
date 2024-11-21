import { Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AuthLayOut = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical" // Ant Design's vertical layout
        >
          {/* Username Field */}
          <Form.Item
            label={<span className="text-gray-700 font-medium">Username</span>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-[#02111E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label={<span className="text-gray-700 font-medium">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#02111E]rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          {/* Remember Me & Forget Password */}
          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-700">Remember me</Checkbox>
            </Form.Item>
            <Link
              to={'/forgetpassword'}
              className="text-sm text-black hover:underline focus:outline-none"
            >
              Forget password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            
            <button
              type="submit"
              
              className="w-full py-2 bg-[#02111E] text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
            >
              Sign In
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AuthLayOut;
