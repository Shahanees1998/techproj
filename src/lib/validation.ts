import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  roleId: z.string(),
  clientId: z.string().optional()
});

export type UserCreateInput = z.infer<typeof userSchema>;

// Add project schema
export const projectSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ON_HOLD']),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  clientId: z.string(),
  teamIds: z.array(z.string()).optional()
});

export type ProjectCreateInput = z.infer<typeof projectSchema>; 