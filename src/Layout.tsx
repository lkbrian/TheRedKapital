import { Navigate, Route, Routes } from "react-router";
import App from "./App";
import AdminLogin from "./components/Admin/AdminLogin";
import { AdminProtectedRoute } from "./route";
import AdminChat from "./components/Admin/AdminChat";
import { Authenticate } from "./Auth";

function Layout() {
  const isAuthenticated = Authenticate();
  return (
    <Routes>
      <Route index path="/" element={<App />} />
      <Route
        path="/admin/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminChat />} />
      </Route>
    </Routes>
  );
}

export default Layout;
