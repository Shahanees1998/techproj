'use client'
import { useAuth } from '@/contexts/AuthContext';
import { Button } from 'primereact/button';
import React from 'react';
const Dashboard = () => {
    const { user } = useAuth();

    console.log('user in dashboard >>>>>>>>>>>', user);
    return (
        <div>
            <Button label="Click" />
        </div>
    );
};

export default Dashboard;
