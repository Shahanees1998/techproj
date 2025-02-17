import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/api-handler';
import { LogType, LogEntity } from '@prisma/client';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

const loginSchema = z.object({
  email: z.string().email()
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const data = await req.json();
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationResult.error },
      { status: 400 }
    );
  }

  const { email } = validationResult.data;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) {
    return NextResponse.json(
      { error: 'user with this email not found' },
      { status: 403 }
    );
  }

  // Generate OTP token
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Save OTP token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpToken: token,
      otpExpiresAt: expiresAt
    }
  });

  // Generate login link
  const loginLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  // Send email with login link
  await sendEmail({
    to: email,
    subject: 'Login to Strategeaze',
    text: `Click this link to login: ${loginLink}\n\nThis link will expire in 15 minutes.`,
    html: `
      <h1>Login to Strategeaze</h1>
      <p>Click the button below to login:</p>
      <a href="${loginLink}" style="padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
        Login to Strategeaze
      </a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${loginLink}</p>
      <p>This link will expire in 15 minutes.</p>
    `
  });

  await prisma.activityLog.create({
    data: {
      type: LogType.LOGIN,
      entity: LogEntity.USER,
      entityId: user.id,
      userId: user.id,
      description: `Login link sent to: ${email}`
    }
  });

  // Don't reveal whether the user exists or not
  return NextResponse.json({
    message: 'If your email is registered, you will receive a login link shortly.'
  });
}); 