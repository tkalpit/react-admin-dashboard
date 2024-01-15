import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("isAuthenticated protected route", isAuthenticated);

  useEffect(() => {
    // Ensure that value is included in the dependency array
    console.log('Value changed:', isAuthenticated);
    if(isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <Outlet />;
};
export default ProtectedRoute;
