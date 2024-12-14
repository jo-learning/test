import React, { createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const localuser = JSON.parse(localStorage.getItem("user"))
    if (localuser){
        setUser(localuser);
    }
    },[])


  const LoggedInUser = ({token}) => {
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);

    const decodedPayload = decodeJWT(token);
    console.log(decodedPayload.aud);
    setUser(decodedPayload.aud)
    localStorage.setItem("user", JSON.stringify(decodedPayload.aud));
    // document.documentElement.classList.remove(theme);
    // document.documentElement.classList.add(newTheme);
  };

  const LoggedOutUser = () => {
    localStorage.removeItem('user');
    setUser([]);
  }

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
    <UserContext.Provider value={{ user, LoggedInUser, LoggedOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
