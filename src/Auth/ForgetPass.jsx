import { Form, Input } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UseAxios from "../hook/UseAxios";
import Swal from "sweetalert2";  
import { useState } from "react";

const ForgetPass = () => {
  const axiosUrl = UseAxios();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);  

  const onFinish = async (values) => {
    setIsLoading(true); 

    try {
      const response = await axiosUrl.post("/auth/forgot-password", {
        email: values.email,
      });

      console.log(response.data);

      if (response.data.message) {
        Swal.fire({
          title: "OTP Sent!",
          text: "Check your email for the OTP to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
        });

        localStorage.setItem("email", values.email);
        navigate("/verify");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to send OTP. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false);  
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold flex justify-center mb-6 text-gray-800">
          <span className="text-[#004466] text-4xl mr-2">
            <IoIosArrowRoundBack />
          </span>
          Forget Password
        </h2>
        <h3 className="text-center text-[#333333] mb-5">
          Please enter your email address to reset your password.
        </h3>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 border border-[#02111E] rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 bg-[#02111E] text-white rounded-md"
              disabled={isLoading}  
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}  
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPass;
