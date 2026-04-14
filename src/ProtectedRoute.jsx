import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("authToken");
  if (!auth) {
    useEffect(() => {
      navigate("/login");
    }, []);
  }
  return children;
};

export default ProtectedRoute;
