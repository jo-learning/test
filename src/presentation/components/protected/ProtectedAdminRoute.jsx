// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import UserContext from '../../../shared/utils/UserContext';
// // import { useEffect } from 'react';
// // import { apiClient } from '../../../data/services/apiClient';

// // eslint-disable-next-line react/prop-types
// const ProtectedRoute = ({ children }) => {
//   const {checkUser} = useContext(UserContext)
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
//   console.log(checkUser())

//   return checkUser().then((result) => result === true ? children : <Navigate to="/" /> ) ;
// };

// export default ProtectedRoute;



// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../../shared/utils/UserContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { checkAdmin } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null to indicate loading

  useEffect(() => {
    const verifyUser = async () => {
      try {


        const result = await checkAdmin(); // Wait for checkUser to resolve
    
        
        setIsAuthenticated(result);
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthenticated(false); // Set to false on error
      }
    };

    verifyUser();
  }, [checkAdmin]);

  // While authentication is being checked, show a loading state or nothing
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  // Render children if authenticated, otherwise redirect
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

