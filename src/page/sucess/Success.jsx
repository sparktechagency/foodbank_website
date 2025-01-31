import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUpdateSuccessQuery } from "../redux/api/eventApi";

export const Success = () => {
  const{eventId, type, userId} = useParams()
  const {data:success} = useUpdateSuccessQuery({ eventId, type, userId},
              { refetchOnMountOrArgChange: true });

  console.log('success=======',success)


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
        <h1 className="text-2xl font-bold mb-2">Request Accepted Successfully!</h1>
        
        <Link to={'/'}><button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
          Your dashboard
        </button></Link>
      </div>
    </div>
  );
};

