import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

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

    useEffect(() => {
        // Check for stored auth token
        const token = localStorage.getItem('auth_token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token: string) => {
        try {
            const response = await fetch('/api/auth/verify', {
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
    };

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

    const verify = async (token: string) => {
        try {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            if (!response.ok) throw new Error('Verification failed');

            const data = await response.json();
            handleAuthSuccess(data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Verification failed:', error);
            throw error;
        }
    };

    const handleAuthSuccess = (data: { token: string; user: User }) => {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        router.push('/auth/login');
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