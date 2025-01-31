import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";

import { useGetSuperAdminQuery } from "../page/redux/api/userApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  const { data: getUserInfo, isError, isLoading, isSuccess } = useGetSuperAdminQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensure fresh data on mount
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton active />
      </div>
    );
  }

  if (isError || !isSuccess || !getUserInfo?.data || !["admin", "super_admin"].includes(getUserInfo.data.role)) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
