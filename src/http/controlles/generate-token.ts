import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { GenerateToken } from '@/use-cases/generate-token';

export class GenerateTokenController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const tokenSchemaBody = z.object({
      userId: z.string(),
      role: z.enum(['admin', 'student']).default('student'),
    });

    try {
      const input = tokenSchemaBody.parse(request.body);
      const token = (new GenerateToken).execute(input);
      reply.status(201).send({ token });
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}
