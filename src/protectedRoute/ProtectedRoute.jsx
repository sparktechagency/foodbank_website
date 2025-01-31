import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetSuperAdminQuery } from "../page/redux/api/userApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [isAuthorized, setIsAuthorized] = useState(null);

  const { data: getUserInfo, isError, isLoading, isFetching } = useGetSuperAdminQuery();

  useEffect(() => {
    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    if (getUserInfo?.data) {
      const userRole = getUserInfo.data.role;
      setIsAuthorized(["admin", "super_admin"].includes(userRole));
    } else if (isError) {
      setIsAuthorized(false);
    }
  }, [accessToken, getUserInfo, isError]);

  if (!accessToken || isAuthorized === false) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (isLoading || isFetching || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton active />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
