"use client";
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useAuth } from '@/contextapi/AuthContext';
import { useForm } from "react-hook-form";
import authService from '@/appwrite/auth';
import { Button, Input } from '@/components';

const Signup = () => {
    const [error, setError] = useState("")
    const router = useRouter()
    const { setIsAuthenticated, setUserData } = useAuth();
    const { register, handleSubmit } = useForm();

    const createAccount = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) setIsAuthenticated(true)
                setUserData(userData)
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <div>
            {error && <div className="text-red-500 text-center">{error}</div>}

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