/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react'
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from '@/contextapi/AuthContext';
import { useForm } from "react-hook-form";
import authService from '@/appwrite/auth';
import { Button, Input } from '@/components';

function Login() {
    const router = useRouter()
    const { setIsAuthenticated, setUserData } = useAuth();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) setIsAuthenticated(true)
                setUserData(userData)
                router.push("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="">

            {error && <div className="text-red-500 text-center">{error}</div>}

            <form onSubmit={handleSubmit(login)} className="flex flex-col space-y-4">
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
                <Button type="submit" className="w-full">Login</Button>
            </form>
        </div>
    )
}

export default Login