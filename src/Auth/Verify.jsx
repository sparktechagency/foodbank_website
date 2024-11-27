import { useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold flex justify-center mb-6 text-gray-800">
          <span className="text-[#004466] text-4xl  mr-2">
          <IoIosArrowRoundBack />
          </span>
          <span>Verify Email</span>
        </h2>
        <h3 className="text-center text-[#333333] mb-5">
        Please enter the otp we have sent you in your email.
        </h3>

        {/* OTP Input */}
        <div className="flex justify-center mb-5">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-16 text-center text-lg border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ width: "40px", height: "50px" }} 
              />
            )}
          />
        </div>
        <Link to={'/reset'}>
            <button
              type="submit"
              className="w-full py-2 bg-[#02111E] text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
            >
              Send OTP
            </button></Link>
      </div>
    </div>
  );
};

export default Verify;
