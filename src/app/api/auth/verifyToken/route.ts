import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { jwtVerify } from 'jose';

export const POST = createApiHandler(async (req: NextRequest) => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { token } = await req.json();
        const { payload } = await jwtVerify(token, secret);
        const user = await prisma.user.findUnique({
            where: { id: payload.sub as string },
            include: { role: true }
        });
        const response = NextResponse.json({
            token: token,
            user: {
              id: user?.id,
              email: user?.email,
              name: user?.name,
              role: user?.role.name
            }
          });
          return response;
    } catch (error) {
        console.log('error in verifyToken >>>>>>>>>>>', error)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }


}); 