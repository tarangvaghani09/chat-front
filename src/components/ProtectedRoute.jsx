import React from "react";
import { Navigate } from "react-router-dom";

const getToken = () => localStorage.getItem("token");

// Function to check if the token is expired
const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true; // No token = Expired

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    const expiry = decodedToken.exp * 1000; // Convert to milliseconds
    return Date.now() > expiry; // Check expiration
  } catch (error) {
    return true; // If decoding fails, treat as expired
  }
};

const ProtectedRoute = ({ element }) => {
  if (!getToken() || isTokenExpired()) {
    localStorage.removeItem("token"); // Clear expired token
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
