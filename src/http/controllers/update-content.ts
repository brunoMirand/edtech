import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { UnableUpdateContentError } from '@/use-cases/errors/contents-errors';
import { contentSchemaBody, contentSchemaId } from '@/http/validations/schema';

export class UpdateContentController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters }>, reply: FastifyReply) {
    try {
      const id = contentSchemaId.parse(request.params.id);
      const input = contentSchemaBody.parse(request.body);
      const updateContent = (ContentsUseCasesFactory.make()).updateContent;
      await updateContent.execute(id, input);
      reply.status(204).send();
    } catch (e) {
      if (e instanceof ZodError) {
        reply.status(422).send({ message: JSON.parse(e.message) });
      }
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
