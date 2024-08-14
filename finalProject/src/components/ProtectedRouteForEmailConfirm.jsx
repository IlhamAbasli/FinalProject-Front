import { Navigate, useLocation } from "react-router-dom";
const ProtectedRouteForEmailConfirm = ({ children }) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const token = params.get("token");
  return token && userId ? children : <Navigate to="/login" />;
};

export default ProtectedRouteForEmailConfirm;
