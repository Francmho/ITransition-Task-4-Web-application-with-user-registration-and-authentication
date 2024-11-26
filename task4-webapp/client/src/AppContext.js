import React, { createContext, useState } from 'react';

// Create the App Context
export const AppContext = createContext();

// Context component that will wrap the app
export const Context = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
