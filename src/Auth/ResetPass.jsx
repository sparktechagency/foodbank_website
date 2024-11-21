import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPass = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <h3 className="text-[#333333] text-center mb-5">
          Your password must be 8-10 characters long.
        </h3>
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
          {/* Password Field */}
          <Form.Item
            name="password"
           
            rules={[
              {
                required: true,
                message: "Please set your password!",
              },
              {
                min: 8,
                max: 10,
                message: "Password must be 8-10 characters long!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#02111E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            
            dependencies={["password"]} // Depends on the "password" field
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
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
              className="w-full px-4 py-2 border border-[#02111E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Link to={"/"}>
              <button
                type="submit"
                className="w-full py-2 bg-[#02111E] text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
              >
                Reset Password
              </button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPass;
