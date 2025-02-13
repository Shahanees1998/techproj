import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { projectSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ON_HOLD']).optional(),
  clientId: z.string().optional(),
  sortBy: z.enum(['name', 'startDate', 'status', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.READ_PROJECT);
  if (authResult instanceof NextResponse) return authResult;

  // Parse and validate query parameters
  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    search: url.searchParams.get('search'),
    status: url.searchParams.get('status'),
    clientId: url.searchParams.get('clientId'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder')
  });

  if (!queryResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: queryResult.error },
      { status: 400 }
    );
  }

  const { page, limit, search, status, clientId, sortBy, sortOrder } = queryResult.data;

  // Build where clause
  const where: Prisma.ProjectWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(status && { status }),
    ...(clientId && { clientId })
  };

  // Get total count for pagination
  const total = await prisma.project.count({ where });

  // Get paginated projects
  const projects = await prisma.project.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      client: true,
      team: true,
      jobs: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.PROJECT,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed projects (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.CREATE_PROJECT);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = projectSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: validationResult.data,
    include: {
      client: true,
      team: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.PROJECT,
      entityId: project.id,
      userId: authResult.id,
      description: `Created project ${project.name}`
    }
  });

  return NextResponse.json(project);
}); 