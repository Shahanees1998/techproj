import { Permission, User } from '@prisma/client';
import { prisma } from './prisma';

export async function hasPermission(userId: string, permission: Permission): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });

  return user?.role.permissions.includes(permission) ?? false;
}

export async function requirePermission(user: User, permission: Permission) {
  const hasAccess = await hasPermission(user.id, permission);
  if (!hasAccess) {
    throw new Error('Forbidden');
  }
}

export function hasAllPermissions(userId: string, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userId, permission));
}

export function hasAnyPermission(userId: string, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userId, permission));
} 
