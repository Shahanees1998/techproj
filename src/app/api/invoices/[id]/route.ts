import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { invoiceSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      job: true,
      client: true
    }
  });

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.INVOICE,
      entityId: invoice.id,
      userId: authResult.id,
      description: `Viewed invoice ${invoice.number}`
    }
  });

  return NextResponse.json(invoice);
});

export const PUT = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = invoiceSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const invoice = await prisma.invoice.update({
    where: { id: params.id },
    data: validationResult.data,
    include: {
      job: true,
      client: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.INVOICE,
      entityId: invoice.id,
      userId: authResult.id,
      description: `Updated invoice ${invoice.number}`,
      metadata: data
    }
  });

  return NextResponse.json(invoice);
});

export const DELETE = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const invoice = await prisma.invoice.delete({
    where: { id: params.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.INVOICE,
      entityId: params.id,
      userId: authResult.id,
      description: `Deleted invoice ${invoice.number}`
    }
  });

  return NextResponse.json({ success: true });
}); 