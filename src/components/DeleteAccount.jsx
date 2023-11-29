'use client';
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { useAuth } from '@/contextapi/AuthContext';
import authService from '@/appwrite/auth';

const DeleteAccount = () => {
    const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
    const [error, setError] = useState(null)


    const deleteAccount = async () => {
        try {
            const response = await authService.accountSoftDelete();
            setIsAuthenticated(false);
            setUserData(null);
            console.log(response);
        } catch (e) {
            setError(e.message);
        }

    }



    return (
        <>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {
            isAuthenticated ? (
                <Button onClick={deleteAccount}>Delete Account</Button>
            ) : ""
        }
        </>
    )
}

export default DeleteAccount