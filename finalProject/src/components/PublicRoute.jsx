// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user-info"));
  return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;
