import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const ProtectedRoutes = ({ children }) => {
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("jwt");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/admin/authentication/${authToken}`);
        if (response.status === 200) {
          setTokenIsValid(true);
        } else {
          setTokenIsValid(false);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setTokenIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [authToken]);

  if (isLoading) {
    // You can add a loading spinner here while the authentication check is in progress
    return <div>Loading...</div>;
  }

  if (!tokenIsValid) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
