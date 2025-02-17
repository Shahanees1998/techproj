import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { deleteCookieServerSide, getCookieServerSide } from '@/helpers/serverHelpers';
import API from '@/helpers/apiClient';
import { AxiosError } from 'axios';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => Promise<void>;
    verify: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    verify: async () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleLogout = useCallback(() => {
        deleteCookieServerSide('token');
        setUser(null);
        router.push('/auth/login');
    }, [router]);

    const verifyToken = useCallback(async (token: string) => {
        try {
            const response = await fetch('/api/auth/verify-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            if (!response.ok) throw new Error('Invalid token');

            const data = await response.json();
            handleAuthSuccess(data);
        } catch (error) {
            console.error('Token verification failed:', error);
            handleLogout();
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = await getCookieServerSide('token');
            if (token) {
                verifyToken(token);
            } else {
                setLoading(false);
            }
        };

        checkAuthToken();
    }, [verifyToken]);

    const login = async (email: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error('Login failed');

            await response.json();
            router.push('/auth/check-email');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const verify = useCallback(async (token: string) => {
        try {
            const response = await API.post('/auth/verify-link', { token });
            if (response.status === 200) {
                const data = response.data;
                handleAuthSuccess(data);
                router.push('/');
            }
            else {
                throw new Error('Verification failed');
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            throw new Error(axiosError.response?.data?.error || 'An unexpected error occurred.');
        }
    }, [router]);

    const handleAuthSuccess = (data: { token: string; user: User }) => {
        // localStorage.setItem('auth_token', data.token);
        setUser(data.user);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, verify, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 