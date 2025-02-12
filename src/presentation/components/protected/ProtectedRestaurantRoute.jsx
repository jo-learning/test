// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../../shared/utils/UserContext';
// import { useEffect } from 'react';
// import { apiClient } from '../../../data/services/apiClient';

// eslint-disable-next-line react/prop-types
const ProtectedRestaurantRoute = ({ children }) => {
    const { checkRestaurant } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null to indicate loading
  
    useEffect(() => {
      const verifyUser = async () => {
        try {
          const result = await checkRestaurant(); // Wait for checkRestaurant to resolve
          setIsAuthenticated(result);
        } catch (error) {
          console.error("Error verifying user:", error);
          setIsAuthenticated(false); // Set to false on error
        }
      };
  
      verifyUser();
    }, [checkRestaurant]);
  
    // While authentication is being checked, show a loading state or nothing
    if (isAuthenticated === null) {
      return <div>Loading...</div>; // Replace with a loading spinner if needed
    }
  
    // Render children if authenticated, otherwise redirect
    return isAuthenticated ? children : <Navigate to="/" />;
  };

export default ProtectedRestaurantRoute;
