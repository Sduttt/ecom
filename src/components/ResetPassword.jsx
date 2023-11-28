/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useAuth } from '@/contextapi/AuthContext';
import { useForm } from "react-hook-form";
import authService from '@/appwrite/auth';
import { Button, Input } from '@/components';
import Cookies from 'js-cookie';


function ResetPassword() {
    const router = useRouter()
    const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")

    const [userId, setUserId] = useState(null)
    const [secret, setSecret] = useState(null)

    useEffect(() => {
        const URLparams = new URLSearchParams(window.location.search);
        setUserId(URLparams.get("userId"));
        setSecret(URLparams.get("secret"));
    }, [router])


    const reset = async (data) => {
        setError("")
        try {
            if (data.password1 !== data.password2) {
                throw new Error("Passwords do not match")
            }
            await authService.passwordReset(userId, secret, data.password1, data.password2);
            router.push("/login");

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="">

            {error && <div className="text-red-500 text-center">{error}</div>}
            {/* <Link href="/forgot-password" className="text-center text-blue-500">Forgot Password?</Link> */}
            <form method='post' onSubmit={handleSubmit(reset)} className="flex flex-col space-y-4">
                <Input
                    label="password1"
                    type="password"
                    placeholder="password"
                    {...register("password1", { required: true })}
                />
                <Input
                    label="Password2"
                    type="password"
                    placeholder="Repeat Password"
                    {...register("password2", { required: true })}
                />
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </div>
    )
}

export default ResetPassword