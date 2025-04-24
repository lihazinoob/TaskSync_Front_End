import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

function ProtectedRoute() {
  const { accessToken } = useAuth();

  // If no accessToken, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
}

export default ProtectedRoute;