// context/YourContextProvider.js
import React, { createContext, useState, useContext } from "react";

// Create a context
const LoggedStatus = createContext();

// Create a provider component
const LoggedStatusProvider = ({ children }) => {
  const [loggedStatus, setLoggedStatus] = useState(false);

  const updateLoggedStatus = (newValue) => {
    setLoggedStatus(newValue);
  };

  return (
    <LoggedStatus.Provider value={{ loggedStatus, updateLoggedStatus }}>
      {children}
    </LoggedStatus.Provider>
  );
};

// Create a custom hook to use the context
const useLoggedStatus = () => {
  const context = useContext(LoggedStatus);
  if (!context) {
    throw new Error(
      "useLoggedStatus must be used within a LoggedStatusProvider"
    );
  }
  return context;
};

export { LoggedStatusProvider, useLoggedStatus };
