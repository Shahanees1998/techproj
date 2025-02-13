import { NextRequest, NextResponse } from 'next/server';
import { Permission } from '@prisma/client';
import { prisma } from './prisma';
import { hasPermission } from './permissions';

export async function getCurrentUser(req: NextRequest) {
  // TODO: Replace with your actual auth logic
  const userId = req.headers.get('x-user-id');
  if (!userId) return null;
  
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });
}

export async function requirePermission(req: NextRequest, permission: Permission) {
  const user = await getCurrentUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hasAccess = await hasPermission(user.id, permission);
  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return user;
}