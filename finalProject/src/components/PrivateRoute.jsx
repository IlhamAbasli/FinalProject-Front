// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utilities/auth";

const PrivateRoute = ({ children, roles }) => {
  const userRoles = getUserRole();

  // Check if any of the user's roles are in the allowed roles
  const hasAccess =
    userRoles && userRoles.some((existRole) => roles.includes(existRole));

  // If the user does not have access, redirect to login
  if (!hasAccess) {
    return <Navigate to="/login" />;
  }

  // If the user has access, render the children
  return children;
};

export default PrivateRoute;
