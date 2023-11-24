"use client";
import React, { createContext, useContext, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react'; 
// Create the AuthContext
export const AuthContext = createContext();

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);


// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const value = { isAuthenticated, setIsAuthenticated, userData, setUserData };

  return (
    <AuthContext.Provider value={value}>
      <NextUIProvider>
      {children}
      </NextUIProvider>
    </AuthContext.Provider>
  );
};
