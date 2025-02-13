import { NextRequest, NextResponse } from 'next/server';
import { Permission } from '@prisma/client';
import { prisma } from './prisma';

interface AuthResult {
  id: string;
  role: string;
  permissions: Permission[];
}

export async function getCurrentUser(req: NextRequest) {
  // TODO: Replace with your actual auth logic
  const userId = req.headers.get('x-user-id');
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });
}

export async function requirePermission(
  req: NextRequest,
  requiredPermission: Permission
): Promise<AuthResult | NextResponse> {
  const userId = req.headers.get('x-user-id');
  const userRole = req.headers.get('x-user-role');
  console.log('here3');
  if (!userId || !userRole) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Get user's role and permissions
  const role = await prisma.role.findUnique({
    where: { name: userRole },
    select: { permissions: true }
  });

  if (!role) {
    return NextResponse.json(
      { error: 'Invalid role' },
      { status: 403 }
    );
  }

  // Check if user has required permission
  if (!role.permissions.includes(requiredPermission)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  return {
    id: userId,
    role: userRole,
    permissions: role.permissions
  };
}

