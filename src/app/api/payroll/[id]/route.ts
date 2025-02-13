import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { payrollSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_PAYROLL);
  if (authResult instanceof NextResponse) return authResult;

  const payroll = await prisma.payroll.findUnique({
    where: { id: params.id },
    include: {
      technician: true
    }
  });

  if (!payroll) {
    return NextResponse.json({ error: 'Payroll not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.PAYROLL,
      entityId: payroll.id,
      userId: authResult.id,
      description: `Viewed payroll for technician ${payroll.technicianId}`
    }
  });

  return NextResponse.json(payroll);
});

export const PUT = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_PAYROLL);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = payrollSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const payroll = await prisma.payroll.update({
    where: { id: params.id },
    data: validationResult.data,
    include: {
      technician: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.PAYROLL,
      entityId: payroll.id,
      userId: authResult.id,
      description: `Updated payroll for technician ${payroll.technicianId}`,
      metadata: data
    }
  });

  return NextResponse.json(payroll);
});

export const DELETE = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_PAYROLL);
  if (authResult instanceof NextResponse) return authResult;

  const payroll = await prisma.payroll.delete({
    where: { id: params.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.PAYROLL,
      entityId: params.id,
      userId: authResult.id,
      description: `Deleted payroll for technician ${payroll.technicianId}`
    }
  });

  return NextResponse.json({ success: true });
}); 