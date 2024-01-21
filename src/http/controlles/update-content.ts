import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { UnableUpdateContentError } from '@/use-cases/errors/contents-errors';

export class UpdateContentController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters }>, reply: FastifyReply) {
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
      if (e instanceof UnableUpdateContentError) {
        reply.status(422).send({ message: e.message });
      }

      throw e;
    }
  }
}

type Parameters = {
  id: string;
}
