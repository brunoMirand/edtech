import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { UnableRemoveContentError } from '@/use-cases/errors/contents-errors';

export class RemoveContentController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters}>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const removeContent = (ContentsUseCasesFactory.make()).removeContent;
      await removeContent.execute(id);
      reply.status(204).send();
    } catch (e) {
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
