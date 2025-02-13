import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { projectSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';

export const GET = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.READ_PROJECT);
  if (authResult instanceof NextResponse) return authResult;

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      team: true,
      jobs: true
    }
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  await prisma.activityLog.create({
    data: {
      type: LogType.READ,
      entity: LogEntity.PROJECT,
      entityId: project.id,
      userId: authResult.id,
      description: `Viewed project ${project.name}`
    }
  });

  return NextResponse.json(project);
});

export const PUT = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.UPDATE_PROJECT);
  if (authResult instanceof NextResponse) return authResult;

  const data = await req.json();
  
  const validationResult = projectSchema.partial().safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const project = await prisma.project.update({
    where: { id: params.id },
    data: validationResult.data,
    include: {
      client: true,
      team: true,
      jobs: true
    }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.UPDATE,
      entity: LogEntity.PROJECT,
      entityId: project.id,
      userId: authResult.id,
      description: `Updated project ${project.name}`,
      metadata: data
    }
  });

  return NextResponse.json(project);
});

export const DELETE = createApiHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const authResult = await requirePermission(req, Permission.DELETE_PROJECT);
  if (authResult instanceof NextResponse) return authResult;

  const project = await prisma.project.delete({
    where: { id: params.id }
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.DELETE,
      entity: LogEntity.PROJECT,
      entityId: params.id,
      userId: authResult.id,
      description: `Deleted project ${project.name}`
    }
  });

  return NextResponse.json({ success: true });
}); 