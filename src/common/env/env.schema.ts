import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535)
});
export type Env = z.infer<typeof envSchema>;
