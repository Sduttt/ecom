/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import authService from '@/appwrite/auth';
import Cookies from 'js-cookie';
// Create the AuthContext
export const AuthContext = createContext();

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);


// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const value = { isAuthenticated, setIsAuthenticated, authLoading, setAuthLoading, userData, setUserData };
  const uid = Cookies.get("uid")

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        try {
          const user = await authService.getUser(uid);
          setUserData(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      }
      setAuthLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </AuthContext.Provider>
  );
};
