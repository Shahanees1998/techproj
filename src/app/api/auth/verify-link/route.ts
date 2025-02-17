import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { LogType, LogEntity } from '@prisma/client';
import { SignJWT } from 'jose';

const verifySchema = z.object({
  token: z.string()
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const data = await req.json();

  const validationResult = verifySchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const { token } = validationResult.data;

  // Find user with valid OTP token
  const user = await prisma.user.findFirst({
    where: {
      otpToken: token,
      otpExpiresAt: { gt: new Date() }
    },
    include: { role: true }
  });
  if (!user) {
    return NextResponse.json(
      { error: 'invalid or expired token' },
      { status: 403 }
    );
  }

  // Clear OTP token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpToken: null,
      otpExpiresAt: null
    }
  });

  // Generate JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwtToken = await new SignJWT({
    sub: user.id,
    email: user.email,
    role: user.role.name
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  await prisma.activityLog.create({
    data: {
      type: LogType.LOGIN,
      entity: LogEntity.USER,
      entityId: user.id,
      userId: user.id,
      description: `User logged in: ${user.email}`
    }
  });
  const response = NextResponse.json({
    token: jwtToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name
    }
  });
  response.cookies.set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  return response;
}); 