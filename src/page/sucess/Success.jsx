import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUpdateSuccessQuery } from "../redux/api/eventApi";

export const Success = () => {
  const { eventId, type, userId } = useParams();

  const { data: success, isLoading } = useUpdateSuccessQuery(
    { eventId, type, userId },
    { refetchOnMountOrArgChange: true }
  );

  console.log("===============", isLoading, success);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background confetti */}
      <div className="absolute inset-0">
        <div className="confetti-animation"></div>
      </div>

      {/* Success Card */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg text-center z-10">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Processing your request...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  success?.data?.status ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {success?.data.status ? (
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
                ) : (
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {success?.data?.message ||
                (success?.status
                  ? "Request Accepted Successfully!"
                  : "Request Failed!")}
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
