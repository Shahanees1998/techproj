import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { jobSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
  const authResult = await requirePermission(req, Permission.READ_JOB);
  if (authResult instanceof NextResponse) return authResult;

  const job = await prisma.job.findUnique({
    where: { id: pathParams.id },
    include: {
      project: true,
      leadTechnicians: true,
      technicians: true,
      schedules: true,
      invoices: true
    }
  });

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.JOB,
      entityId: job.id,
      userId: authResult.id,
      description: `Viewed job ${job.title}`
    }
  });

  return NextResponse.json(job);
});

export const PUT = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
  const authResult = await requirePermission(req, Permission.UPDATE_JOB);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = jobSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const job = await prisma.job.update({
    where: { id: pathParams.id },
    data: validationResult.data,
    include: {
      project: true,
      leadTechnicians: true,
      technicians: true,
      schedules: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.JOB,
      entityId: job.id,
      userId: authResult.id,
      description: `Updated job ${job.title}`,
      metadata: data
    }
  });

  return NextResponse.json(job);
});

export const DELETE = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
  const authResult = await requirePermission(req, Permission.DELETE_JOB);
  if (authResult instanceof NextResponse) return authResult;

  const job = await prisma.job.delete({
    where: { id: pathParams.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.JOB,
      entityId: pathParams.id,
      userId: authResult.id,
      description: `Deleted job ${job.title}`
    }
  });

  return NextResponse.json({ success: true });
}); 