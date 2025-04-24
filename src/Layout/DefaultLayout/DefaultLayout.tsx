import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
export default function DefaultLayout() {
  const {accessToken} = useAuth();

  if(accessToken)
  {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet/> 
  
 
}
