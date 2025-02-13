import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { invoiceSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const invoice = await prisma.invoice.findUnique({
    where: { id: pathParams.id }
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

export const PUT = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
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
    where: { id: pathParams.id },
    data: validationResult.data
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

export const DELETE = createApiHandler(async (req: NextRequest, { params }) => {
  const pathParams = await params as { id: string };
  const authResult = await requirePermission(req, Permission.MANAGE_INVOICES);
  if (authResult instanceof NextResponse) return authResult;

  const invoice = await prisma.invoice.delete({
    where: { id: pathParams.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.INVOICE,
      entityId: pathParams.id,
      userId: authResult.id,
      description: `Deleted invoice ${invoice.number}`
    }
  });

  return NextResponse.json({ success: true });
}); 