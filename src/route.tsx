import { Navigate, Outlet } from "react-router-dom";
import { Authenticate } from "./Auth";

export const AdminProtectedRoute = () => {
  const isAuthenticated = Authenticate();
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or some loading spinner
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
