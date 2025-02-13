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

// Add job schema
export const jobSchema = z.object({
  title: z.string().min(2),
  description: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  projectId: z.string(),
  leadTechIds: z.array(z.string()).optional(),
  technicianIds: z.array(z.string()).optional()
});

export type JobCreateInput = z.infer<typeof jobSchema>;

// Add client schema
export const clientSchema = z.object({
  name: z.string().min(2),
  address: z.string(),
  phone: z.string().min(10),
  userIds: z.array(z.string()).optional() // For CP and IP users
});

export type ClientCreateInput = z.infer<typeof clientSchema>;

// Add schedule schema
export const scheduleSchema = z.object({
  title: z.string().min(2),
  description: z.string(),
  date: z.coerce.date(),
  jobIds: z.array(z.string())
});

export type ScheduleCreateInput = z.infer<typeof scheduleSchema>;

// Add invoice schema
export const invoiceSchema = z.object({
  number: z.string(),
  amount: z.number().positive(),
  status: z.enum(['DRAFT', 'SENT', 'PAID']),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  jobId: z.string(),
  clientId: z.string()
});

export type InvoiceCreateInput = z.infer<typeof invoiceSchema>;

// Add payroll schema
export const payrollSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  amount: z.number().positive(),
  status: z.enum(['PENDING', 'PROCESSED', 'PAID']),
  technicianId: z.string()
});

export type PayrollCreateInput = z.infer<typeof payrollSchema>; 