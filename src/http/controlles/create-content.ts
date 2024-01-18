import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class CreateContentController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const contentSchemaBody = z.object({
      name: z.string().min(6),
      description: z.string().min(10),
      type: z.enum(['pdf', 'video', 'image']),
    });

    try {
      const { body, role } = request;
      const input = contentSchemaBody.parse(body);
      const createContent = (ContentsUseCasesFactory.make()).createContent;
      const response = await createContent.execute(input, role);
      return reply.status(201).send(response);
    } catch (e) {
      return reply.status(400).send(e.message);
    }
  }
}
