import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { jobSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
  projectId: z.string().optional(),
  technicianId: z.string().optional(),
  sortBy: z.enum(['title', 'startDate', 'status', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.READ_JOB);
  if (authResult instanceof NextResponse) return authResult;

  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    search: url.searchParams.get('search'),
    status: url.searchParams.get('status'),
    projectId: url.searchParams.get('projectId'),
    technicianId: url.searchParams.get('technicianId'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder')
  });

  if (!queryResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: queryResult.error },
      { status: 400 }
    );
  }

  const { page, limit, search, status, projectId, technicianId, sortBy, sortOrder } = queryResult.data;

  const where: Prisma.JobWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(status && { status }),
    ...(projectId && { projectId }),
    ...(technicianId && {
      OR: [
        { leadTechIds: { has: technicianId } },
        { technicianIds: { has: technicianId } }
      ]
    })
  };

  const total = await prisma.job.count({ where });

  const jobs = await prisma.job.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      project: true,
      leadTechnicians: true,
      technicians: true,
      schedules: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.JOB,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed jobs (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    jobs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.CREATE_JOB);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = jobSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const job = await prisma.job.create({
    data: validationResult.data,
    include: {
      project: true,
      leadTechnicians: true,
      technicians: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.JOB,
      entityId: job.id,
      userId: authResult.id,
      description: `Created job ${job.title}`
    }
  });

  return NextResponse.json(job);
}); 