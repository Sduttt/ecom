/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contextapi/AuthContext';


const AdminProtected = (Component) => {
    return (props) => {
        const { authLoading, isAuthenticated, userData } = useAuth();
        const router = useRouter();

        if (authLoading) {
            return <div>Loading...</div>;
        }
        else if (!isAuthenticated || !userData || !userData.labels.includes('admin')) {
            router.push('/login');
            return null;
        }
        return <Component {...props} />
    }
}

export default AdminProtected;