import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthRoutes() {
  const auth = useAuth();

  return auth.user != null ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoutes;
