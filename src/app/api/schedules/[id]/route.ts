import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { scheduleSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_SCHEDULES);
  if (authResult instanceof NextResponse) return authResult;

  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
    include: {
      jobs: true
    }
  });

  if (!schedule) {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.SCHEDULE,
      entityId: schedule.id,
      userId: authResult.id,
      description: `Viewed schedule ${schedule.title}`
    }
  });

  return NextResponse.json(schedule);
});

export const PUT = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_SCHEDULES);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = scheduleSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const schedule = await prisma.schedule.update({
    where: { id: params.id },
    data: validationResult.data,
    include: {
      jobs: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.SCHEDULE,
      entityId: schedule.id,
      userId: authResult.id,
      description: `Updated schedule ${schedule.title}`,
      metadata: data
    }
  });

  return NextResponse.json(schedule);
});

export const DELETE = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_SCHEDULES);
  if (authResult instanceof NextResponse) return authResult;

  const schedule = await prisma.schedule.delete({
    where: { id: params.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.SCHEDULE,
      entityId: params.id,
      userId: authResult.id,
      description: `Deleted schedule ${schedule.title}`
    }
  });

  return NextResponse.json({ success: true });
}); 