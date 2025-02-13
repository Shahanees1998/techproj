import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Permission } from '@prisma/client';
import { useAuth } from '@/contexts/AuthContext';
import { hasAnyPermission, hasAllPermissions } from '@/lib/permissions';

interface ProtectedRouteProps {
    children: React.ReactNode;
    permissions?: Permission[];
    requireAll?: boolean;
}

export function ProtectedRoute({ children, permissions = [], requireAll = false }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
            return;
        }

        if (!loading && user && permissions.length > 0) {
            const hasAccess = requireAll
                ? hasAllPermissions(user.id, permissions)
                : hasAnyPermission(user.id, permissions);

            if (!hasAccess) {
                router.push('/403');
            }
        }
    }, [user, loading, permissions, requireAll, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    if (permissions.length > 0) {
        const hasAccess = requireAll
            ? hasAllPermissions(user.id, permissions)
            : hasAnyPermission(user.id, permissions);

        if (!hasAccess) {
            return null;
        }
    }

    return <>{children}</>;
} 