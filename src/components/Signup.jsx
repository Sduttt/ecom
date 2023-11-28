/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useAuth } from '@/contextapi/AuthContext';
import { useForm } from "react-hook-form";
import authService from '@/appwrite/auth';
import { Button, Input } from '@/components';
import Cookies from 'js-cookie';
const Signup = () => {
    const [error, setError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const router = useRouter()
    const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
    const { register, handleSubmit } = useForm();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.push('/');
    //     }
    // }, [isAuthenticated]);
    
    const createAccount = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    setIsAuthenticated(true)
                    Cookies.set("uid", userData.$id)
                    setUserData(userData)
                    setShowSuccess(true)
                }
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {showSuccess &&<> <div className="text-green-500 text-center">Account created successfully</div> <div className="text-center">Please check your email for varification link.</div> </>}
            <form onSubmit={handleSubmit(createAccount)} className="flex flex-col space-y-4">
                <Input
                    label="name"
                    type="text"
                    placeholder="Full Name..."
                    {...register("name", { required: true })}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />
                <Button type="submit" className="w-full">Signup</Button>
            </form>
        </div>
    )
}

export default Signup