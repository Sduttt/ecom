"use client";
import React from 'react'
import authService from '@/appwrite/auth';
import { useAuth } from '@/contextapi/AuthContext';
import { Button } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Logout = () => {
    const { setIsAuthenticated, setUserData } = useAuth();
    const router = useRouter()

    const logoutHandler = async () => {
        router.push("/")
        await authService.logout();
        Cookies.remove("uid")
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