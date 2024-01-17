import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateContentUseCase } from '@/use-cases/factories/make-create-content-use-case';

export class CreateContentController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const contentSchemaBody = z.object({
      name: z.string().min(6),
      description: z.string().min(10),
      type: z.enum(['pdf', 'video', 'image']),
    });

    const { body, role } = request;
    try {
      const input = contentSchemaBody.parse(body);
      const content = makeCreateContentUseCase();
      const response = await content.execute(input, role);
      return reply.status(201).send(response);
    } catch (e) {
      return reply.status(400).send(e.message);
    }
  }
}
