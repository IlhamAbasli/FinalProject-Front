// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user-info"));
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
