import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { requirePermission } from '@/lib/auth';
import { userSchema } from '@/lib/validation';
import { LogType, LogEntity, Permission } from '@prisma/client';
import { hasPermission } from '@/lib/permissions';

export const GET = createApiHandler(async (req: NextRequest, { params }) => {
    const pathParams = await params as { id: string };

    const authResult = await requirePermission(req, Permission.READ_USER);
    if (authResult instanceof NextResponse) return authResult;

    // Allow users to read their own record
    if (authResult.id !== pathParams.id) {
        const hasAllAccess = await hasPermission(authResult.id, Permission.READ_ALL_USERS);
        if (!hasAllAccess) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    const user = await prisma.user.findUnique({
        where: { id: pathParams.id }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.activityLog.create({
        data: {
            type: LogType.READ,
            entity: LogEntity.USER,
            entityId: user.id,
            userId: authResult.id,
            description: `Viewed user ${user.email}`
        }
    });

    return NextResponse.json(user);
});

export const PUT = createApiHandler(async (req: NextRequest, { params }) => {
    // Check if user has general update permission
    const pathParams = await params as { id: string };
    const authResult = await requirePermission(req, Permission.UPDATE_USER);
    if (authResult instanceof NextResponse) return authResult;

    // Only allow users to update their own record unless they have READ_ALL_USERS permission
    if (authResult.id !== pathParams.id) {
        const hasAllAccess = await hasPermission(authResult.id, Permission.UPDATE_ALL_USERS);
        if (!hasAllAccess) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    const data = await req.json();

    const validationResult = userSchema.partial().safeParse(data);
    if (!validationResult.success) {
        return NextResponse.json(
            { error: 'Validation failed', details: validationResult.error },
            { status: 400 }
        );
    }

    const user = await prisma.user.update({
        where: { id: pathParams.id },
        data: validationResult.data,
        include: { role: true }
    });

    await prisma.activityLog.create({
        data: {
            type: LogType.UPDATE,
            entity: LogEntity.USER,
            entityId: user.id,
            userId: authResult.id,
            description: `Updated user ${user.email}`,
            metadata: data
        }
    });

    return NextResponse.json(user);
});

export const DELETE = createApiHandler(async (req: NextRequest, { params }) => {
    const pathParams = await params as { id: string };
    // Check if user has delete permission
    const authResult = await requirePermission(req, Permission.DELETE_USER);
    if (authResult instanceof NextResponse) return authResult;

    // Only allow users to delete their own record unless they have DELETE_ALL_USERS permission
    if (authResult.id !== pathParams.id) {
        const hasAllAccess = await hasPermission(authResult.id, Permission.DELETE_ALL_USERS);
        if (!hasAllAccess) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    const user = await prisma.user.delete({
        where: { id: pathParams.id }
    });

    await prisma.activityLog.create({
        data: {
            type: LogType.DELETE,
            entity: LogEntity.USER,
            entityId: pathParams.id,
            userId: authResult.id,
            description: `Deleted user ${user.email}`
        }
    });

    return NextResponse.json({ success: true });
}); 