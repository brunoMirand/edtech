import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class UpdateContentController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const schemaBody = z.object({
      name: z.string().min(6),
      description: z.string().min(10),
      type: z.enum(['pdf', 'video', 'image']),
    });

    try {
      const { id } = request.params;
      const input = schemaBody.parse(request.body);
      const updateContent = (ContentsUseCasesFactory.make()).updateContent;
      await updateContent.execute(id, input);
      reply.status(204).send();
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}