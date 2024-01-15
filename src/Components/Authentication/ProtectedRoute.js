import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <Outlet />;
};
export default ProtectedRoute;
