"use client";
import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import authService from '@/appwrite/auth';
import { Button, Input } from '@/components';
import envconf from '@/envconf';

const ForgotPassword = () => {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null)

    const passwordRecover = async (data) => {
        try {
            const response = await authService.passwordRecovery(data.email, "http://localhost:3000/reset-password");
            console.log(response);
        } catch (e) {
            setError(e.message);
        }
        
    }
    return (
        <div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <form method='post' onSubmit={handleSubmit(passwordRecover)} className="flex flex-col space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                
                <Button type="submit" className="w-full">Send</Button>
            </form>
        </div>
    )
}

export default ForgotPassword

