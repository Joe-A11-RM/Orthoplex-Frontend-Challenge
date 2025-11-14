import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded) return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}
