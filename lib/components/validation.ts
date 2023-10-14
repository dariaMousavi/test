import { z } from 'zod';

export const SignupSchema = z.object({
  userName: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
  email: z.string().email(),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
