import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class RemoveContentController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters}>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const removeContent = (ContentsUseCasesFactory.make()).removeContent;
      await removeContent.execute(id);
      reply.status(204).send();
    } catch (e) {
      reply.status(400).send({ message: e.message });
    }
  }
}

type Parameters = {
  id: string;
}
