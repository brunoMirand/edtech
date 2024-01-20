import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentByIdController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters}>, reply: FastifyReply) {
    try {
      const { params: { id }, user: { sub } } = request;

      const listContentById = (ContentsUseCasesFactory.make()).listContentById;
      const response = await listContentById.execute(id, sub);
      if (!response) {
        reply.status(204).send(response);
      }

      reply.status(200).send(response);
    } catch (e) {
      reply.status(422).send({ message: e.message});
    }
  }
}

type Parameters = {
  id: string;
}
