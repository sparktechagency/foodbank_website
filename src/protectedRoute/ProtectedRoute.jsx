import { useEffect, useState } from "react";
import UseAxios from "../hook/UseAxios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const request = UseAxios();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await request.get("/dashboard/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res?.data?.data?.auth);
      } catch (error) {
        console.log("err", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (!localStorage.getItem("token")) {
    return <Navigate to={`/login`}></Navigate>;
  }
  if (loading) {
    return <p>loading...</p>;
  }
  if (user?.role === "ADMIN") {
    return children;
  }
  return <Navigate to={`/login`}></Navigate>;
};

export default ProtectedRoute;
