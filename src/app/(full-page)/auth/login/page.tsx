'use client';
import React, { useContext, useState } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import API from '../../../../helpers/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import LoginUI from '@/components/auth/login';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const { user } = useAuth();
    if(user !== null){
        router.push('/')
    }
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    // Email validation regex
    const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await API.post('/auth/login', { email });
            if (response.status === 200) {
                toast.success('Login email sent successfully!');
            } else {
                toast.error('Failed to send login email.');
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            toast.error(axiosError.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${containerClassName || ''} w-full max-w-4xl`}>
            <ToastContainer />
            <LoginUI
                email={email}
                setEmail={setEmail}
                isLoading={isLoading}
                handleLogin={handleLogin}
                isEmailValid={isEmailValid}
            />
        </div>
    );
};

export default LoginPage;
