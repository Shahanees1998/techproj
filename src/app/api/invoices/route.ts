import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { invoiceSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission, Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['DRAFT', 'SENT', 'PAID']).optional(),
  clientId: z.string().optional(),
  jobId: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  sortBy: z.enum(['number', 'amount', 'status', 'issueDate', 'dueDate', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const GET = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const url = new URL(req.url);
  const queryResult = querySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    search: url.searchParams.get('search'),
    status: url.searchParams.get('status'),
    clientId: url.searchParams.get('clientId'),
    jobId: url.searchParams.get('jobId'),
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

  const { page, limit, search, status, clientId, jobId, startDate, endDate, sortBy, sortOrder } = queryResult.data;

  const where: Prisma.InvoiceWhereInput = {
    ...(search && {
      OR: [
        { number: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(status && { status }),
    ...(clientId && { clientId }),
    ...(jobId && { jobId }),
    ...(startDate && { issueDate: { gte: startDate } }),
    ...(endDate && { issueDate: { lte: endDate } })
  };

  const total = await prisma.invoice.count({ where });

  const invoices = await prisma.invoice.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      job: true,
      client: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.INVOICE,
      entityId: 'ALL',
      userId: authResult.id,
      description: `Listed invoices (page ${page}, limit ${limit})`
    }
  });

  return NextResponse.json({
    invoices,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = invoiceSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const invoice = await prisma.invoice.create({
    data: validationResult.data,
    include: {
      job: true,
      client: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.CREATE,
      entity: LogEntity.INVOICE,
      entityId: invoice.id,
      userId: authResult.id,
      description: `Created invoice ${invoice.number}`
    }
  });

  return NextResponse.json(invoice);
}); 