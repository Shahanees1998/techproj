import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { clientSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.READ_CLIENT);
  if (authResult instanceof NextResponse) return authResult;

  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    search: url.searchParams.get('search'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder')
  });

  if (!queryResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: queryResult.error },
      { status: 400 }
    );
  }

  const { page, limit, search, sortBy, sortOrder } = queryResult.data;

  const where: Prisma.ClientWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ]
    })
  };

  const total = await prisma.client.count({ where });

  const clients = await prisma.client.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      users: true,
      projects: true,
      invoices: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.CLIENT,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed clients (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    clients,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.CREATE_CLIENT);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = clientSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const client = await prisma.client.create({
    data: validationResult.data,
    include: {
      users: true,
      projects: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.CLIENT,
      entityId: client.id,
      userId: authResult.id,
      description: `Created client ${client.name}`
    }
  });

  return NextResponse.json(client);
}); 