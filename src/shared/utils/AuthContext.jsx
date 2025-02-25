import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null, loading: true });
  // Fetch user role and authentication status from the API
    const verifyUser = async () => {
      console.log("this is working")
      try {
        // const response = await axios.get('http://localhost:3010/api/user/verifyRole'); // Your API endpoint
        const response = await axios.get('https://zoskalus-backend-prisma-postresql.onrender.com/api/user/verifyRole'); // Your API endpoint
        console.log(response)
        
        setAuth({ isAuthenticated: true, role: response.data.role, loading: false });
      } catch (error) {
        console.log(error)
        setAuth({ isAuthenticated: false, role: null, loading: false });
      }
    };

  useEffect(() => {
    

    verifyUser();
  }, []);

  return <AuthContext.Provider value={{auth, verifyUser}}>{children}</AuthContext.Provider>;
};

// Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
