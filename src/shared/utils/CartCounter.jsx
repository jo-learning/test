import React, { createContext, useState, useEffect } from "react";

const CounterContext = createContext();

export const CartCounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  // Load counter
  useEffect(() => {
    const savedCounter = localStorage.getItem("counter")
    const initialCounter = parseInt(savedCounter) || 0;
    setCounter(initialCounter);
  }, []);
  const addCounter = () => {
    localStorage.setItem("counter", (counter + 1));
    setCounter(counter + 1);
    
  }
  const deleteCounter = () => {
    if (counter > 0){
        localStorage.setItem("counter", counter - 1)
        setCounter(counter - 1);}
  }

  return (
    <CounterContext.Provider value={{counter, addCounter, deleteCounter}}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
