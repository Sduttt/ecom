"use client";
import React from 'react'
import authService from '@/appwrite/auth';
import { useAuth } from '@/contextapi/AuthContext';
import { Button } from '@nextui-org/react';

const Logout = () => {
    const { setIsAuthenticated, setUserData } = useAuth();
    const logoutHandler = async () => {
        await authService.logout();
        setIsAuthenticated(false);
        setUserData(null);
    }
    return (
        <Button onClick={logoutHandler} color="primary" variant="flat">
            Log Out
        </Button>
    )
}

export default Logout