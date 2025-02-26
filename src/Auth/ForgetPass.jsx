import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/header/logo.png";
import { useForgotPasswordMutation } from "../page/redux/api/userApi";

const ForgetPass = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
   
    forgotPassword(values)
      .unwrap()
      .then((payload) => {
        message.success("check Your Email");
        navigate("/verify");
        localStorage.setItem("email", values?.email);
      })
      .catch((error) => message.error(error?.data?.message));
  };

  return (
    <div className="min-h-screen flex items-center md:pt-0 px-4 justify-center">
      <div className="w-full max-w-[1500px] m-auto">
        <div className="gap-5">
          <div className="md:flex md:justify-center">
            <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <img src={Logo} alt="Logo" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Forget Password
              </h2>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Email is required" },
                    {
                      type: "email",
                      message: "Invalid email address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item>
               
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full bg-[#234E6F] text-white rounded focus:ring-2 focus:ring-gray-500"
                    >
                      Submit
                    </Button>
                  
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
