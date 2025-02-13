import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { clientSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.READ_CLIENT);
  if (authResult instanceof NextResponse) return authResult;

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      users: true,
      projects: true,
      invoices: true
    }
  });

  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.CLIENT,
      entityId: client.id,
      userId: authResult.id,
      description: `Viewed client ${client.name}`
    }
  });

  return NextResponse.json(client);
});

export const PUT = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.UPDATE_CLIENT);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = clientSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const client = await prisma.client.update({
    where: { id: params.id },
    data: validationResult.data,
    include: {
      users: true,
      projects: true,
      invoices: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.CLIENT,
      entityId: client.id,
      userId: authResult.id,
      description: `Updated client ${client.name}`,
      metadata: data
    }
  });

  return NextResponse.json(client);
});

export const DELETE = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.DELETE_CLIENT);
  if (authResult instanceof NextResponse) return authResult;

  const client = await prisma.client.delete({
    where: { id: params.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.CLIENT,
      entityId: params.id,
      userId: authResult.id,
      description: `Deleted client ${client.name}`
    }
  });

  return NextResponse.json({ success: true });
}); 