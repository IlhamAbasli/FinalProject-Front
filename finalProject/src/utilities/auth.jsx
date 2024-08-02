// utils/auth.js
import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("user-info");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    // Extract role from the specific property
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    return role;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
