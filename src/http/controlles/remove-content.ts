import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { UnableRemoveContentError } from '@/use-cases/errors/contents-errors';
import { contentSchemaId } from '@/http/validations/schema';

export class RemoveContentController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters}>, reply: FastifyReply) {
    try {
      const id = contentSchemaId.parse(request.params.id);
      const removeContent = (ContentsUseCasesFactory.make()).removeContent;
      await removeContent.execute(id);
      reply.status(204).send();
    } catch (e) {
      if (e instanceof ZodError) {
        reply.status(422).send({ message: JSON.parse(e.message) });
      }
      if (e instanceof UnableRemoveContentError) {
        reply.status(422).send({ message: e.message });
      }

      throw e;
    }
  }
}

type Parameters = {
  id: string;
}
