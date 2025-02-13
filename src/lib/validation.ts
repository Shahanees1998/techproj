import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  roleId: z.string(),
  clientId: z.string().optional()
});

export type UserCreateInput = z.infer<typeof userSchema>; 