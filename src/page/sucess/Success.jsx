import React from "react";
import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background confetti */}
      <div className="absolute inset-0">
        <div className="confetti-animation"></div>
      </div>

      {/* Success Card */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-md text-center z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment succeeded!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for processing your most recent payment. Your premium
          subscription will expire on <b>June 2, 2024</b>.
        </p>
        <Link to={'/'}><button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
          Your dashboard
        </button></Link>
      </div>
    </div>
  );
};

