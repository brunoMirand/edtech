import { z } from 'zod';

export const contentSchemaBody = z.object({
  name: z.string().min(6),
  description: z.string().min(10),
  type: z.enum(['pdf', 'video', 'image']),
});

export const contentSchemaId = z.string().uuid({ message: 'Invalid content id.' });
