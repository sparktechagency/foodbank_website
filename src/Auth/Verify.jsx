import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import UseAxios from "../hook/UseAxios";
import Swal from "sweetalert2";  // Import SweetAlert2

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const axiosUrl = UseAxios();

  const handleVerify = async () => {
    const email = localStorage.getItem("email"); 

    if (!email) {
      Swal.fire({
        title: "No email found!",
        text: "Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    setIsLoading(true); 

    try {
      const response = await axiosUrl.post("/auth/recover-password", {
        email: email,
        verificationOTP: otp,
      });
      console.log(response.data);
      
      if (response.data) {
        localStorage.setItem("recoveryToken", response.data.recoveryToken);
        
        Swal.fire({
          title: "OTP Verified!",
          text: "You can now reset your password.",
          icon: "success",
          confirmButtonText: "Proceed"
        });
        navigate("/reset");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Invalid OTP",
        text: "Please try again.",
        icon: "error",
        confirmButtonText: "Try Again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify Email</h2>
        <h3 className="text-[#333333] text-center mb-5">
          Please enter the OTP sent to your email.
        </h3>
        <div className="flex justify-center mb-5">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input {...props} className="w-16 h-16 text-center text-lg border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ width: "40px", height: "50px" }}  />
            )}
          />
        </div>
        <button
          onClick={handleVerify}
          className="w-full py-2 bg-[#02111E] text-white rounded-md"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default Verify;
