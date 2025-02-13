import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { payrollSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.enum(['PENDING', 'PROCESSED', 'PAID']).optional(),
  technicianId: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  sortBy: z.enum(['startDate', 'endDate', 'amount', 'status', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_PAYROLL);
  if (authResult instanceof NextResponse) return authResult;

  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    status: url.searchParams.get('status'),
    technicianId: url.searchParams.get('technicianId'),
    startDate: url.searchParams.get('startDate'),
    endDate: url.searchParams.get('endDate'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder')
  });

  if (!queryResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: queryResult.error },
      { status: 400 }
    );
  }

  const { page, limit, status, technicianId, startDate, endDate, sortBy, sortOrder } = queryResult.data;

  const where: Prisma.PayrollWhereInput = {
    ...(status && { status }),
    ...(technicianId && { technicianId }),
    ...(startDate && { startDate: { gte: startDate } }),
    ...(endDate && { endDate: { lte: endDate } })
  };

  const total = await prisma.payroll.count({ where });

  const payrolls = await prisma.payroll.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      technician: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.PAYROLL,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed payrolls (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    payrolls,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_PAYROLL);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = payrollSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const payroll = await prisma.payroll.create({
    data: validationResult.data,
    include: {
      technician: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.PAYROLL,
      entityId: payroll.id,
      userId: authResult.id,
      description: `Created payroll for technician ${payroll.technicianId}`
    }
  });

  return NextResponse.json(payroll);
}); 