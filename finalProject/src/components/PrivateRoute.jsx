// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utilities/auth";

const PrivateRoute = ({ children, roles }) => {
  const role = getUserRole();

  if (!role || (roles && !roles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
