import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { scheduleSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  date: z.coerce.date().optional(),
  jobId: z.string().optional(),
  sortBy: z.enum(['title', 'date', 'createdAt']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_SCHEDULES);
  if (authResult instanceof NextResponse) return authResult;

  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    search: url.searchParams.get('search'),
    date: url.searchParams.get('date'),
    jobId: url.searchParams.get('jobId'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder')
  });

  if (!queryResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: queryResult.error },
      { status: 400 }
    );
  }

  const { page, limit, search, date, jobId, sortBy, sortOrder } = queryResult.data;

  const where: Prisma.ScheduleWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(date && { date }),
    ...(jobId && { jobIds: { has: jobId } })
  };

  const total = await prisma.schedule.count({ where });

  const schedules = await prisma.schedule.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      jobs: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.SCHEDULE,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed schedules (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    schedules,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_SCHEDULES);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = scheduleSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const schedule = await prisma.schedule.create({
    data: validationResult.data,
    include: {
      jobs: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.SCHEDULE,
      entityId: schedule.id,
      userId: authResult.id,
      description: `Created schedule ${schedule.title}`
    }
  });

  return NextResponse.json(schedule);
}); 