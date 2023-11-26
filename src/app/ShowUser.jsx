"use client";
import React from 'react'
import { useAuth } from "@/contextapi/AuthContext";

const ShowUser = () => {
    const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useAuth();

    return (
        <div>
            <h1>
                User is currently {isAuthenticated ? 'logged in' : 'logged out'}
                <br />
                {userData && `User data: ${userData.name}`}
                {console.log(userData)}
            </h1>
        </div>
    )
}

export default ShowUser