// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";
// import { apiClient } from "../../data/services/apiClient";
// import apiClient from "../../data/services/apiClient"

const UserContext = createContext();

const apiURL = "https://zoskalus-backend-prisma-postresql.onrender.com/"
// const apiURL = "http://localhost:3010/";

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("user"));
    if (localuser) {
      setUser(localuser);
    }
  }, []);

  const checkUser = async () => {
    try{
    // const response = await fetch("http://localhost:3010/api/user/verifyRole", {
    //   credentials: "include",
    // });

    const response = await fetch(`${apiURL}api/user/verifyRole`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET',
      credentials: "include",
    });

    const data = await response.json();
    // const data = await apiClient.get('/api/user/verifyRole')
    // console.log(data.data.role);

    if (data.data.role == "user") {
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }}
    catch(e){
      console.log(e)
      return false;
    }
  };

  const checkInNavBar = async () => {
    try{
    // const response = await fetch(`${apiURL}api/user/verifyRole`, {
    //   credentials: "include",
    // });

    // const data = await apiClient.get('/api/user/verifyRole')
    // console.log(data)

    // const response = await apiClient.get('/')
    console.log("being")
    const response = await fetch(`${apiURL}api/user/verifyRole`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET',
      credentials: "include",
    });
    const data = await response.json();
    console.log(data.data.role);

    if (data.data.role == "user") {
      setIsAuthenticated(true);
      return true;
    }else if(data.data.role == "driver"){
      return true;
    }else if (data.data.role == "restaurant"){
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }}
    catch(e){
      console.log(e)
      return false;
    }
  };

  const checkDriver = async () => {
    const response = await fetch(`${apiURL}api/user/verifyRole`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET',
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data.data.role)

    if (data.data.role == "driver") {
      // setIsAuthenticated(true);
      return true;
    } else {
      // setIsAuthenticated(false);
      return false;
    }
  };

  const checkRestaurant = async () => {
    const response = await fetch(`${apiURL}api/user/verifyRole`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET',
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data.data.role)

    if (data.data.role == "restaurant") {
      // setIsAuthenticated(true);
      return true;
    } else {
      // setIsAuthenticated(false);
      return false;
    }
  };


  const checkAdmin = async () => {
    const response = await fetch(`${apiURL}api/user/verifyRole`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET',
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data.data.role)

    if (data.data.role == "admin") {
      // setIsAuthenticated(true);
      return true;
    } else {
      // setIsAuthenticated(false);
      return false;
    }
  };

  const LoggedInUser = async ({ token }) => {
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);

    const decodedPayload = decodeJWT(token);
    // console.log(decodedPayload.aud);
    setUser(decodedPayload.aud);
    localStorage.setItem("user", JSON.stringify(decodedPayload.aud));
    // document.documentElement.classList.remove(theme);
    // document.documentElement.classList.add(newTheme);
  };

  const LoggedOutUser = () => {
    localStorage.removeItem("user");
    setUser([]);
  };

  function decodeJWT(token) {
    try {
      const base64Payload = token.split(".")[1]; // Extract the payload
      const payload = atob(base64Payload); // Decode from base64
      return JSON.parse(payload); // Parse JSON
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        checkUser,
        checkAdmin,
        checkDriver,
        checkRestaurant,
        user,
        LoggedInUser,
        LoggedOutUser,
        checkInNavBar
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
