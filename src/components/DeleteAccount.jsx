'use client';
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { useAuth } from '@/contextapi/AuthContext';
import authService from '@/appwrite/auth';
import Link from 'next/link';

const DeleteAccount = () => {
    const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
    const [error, setError] = useState(null)
    const [confirmDlt, setConfirmDlt] = useState(false)


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
                <>
                <Button onClick={() => setConfirmDlt(true)}>Delete Account</Button>

                {confirmDlt ? (
                    <>
                        <p>Are you sure you want to delete your account?</p>
                        <Link href={'/'}><Button onClick={() => setConfirmDlt(false)}>No</Button></Link>
                        <Button onClick={deleteAccount} variant="flat">Yes</Button>
                    </>
                ) : (
                    ""
                )}

                </>
            ) : ""
        }
        </>
    )
}

export default DeleteAccount