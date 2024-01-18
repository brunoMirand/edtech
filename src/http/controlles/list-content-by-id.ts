import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentByIdController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const listContentById = (ContentsUseCasesFactory.make()).listContentById;
      const response = await listContentById.execute(id);
      if (!response) {
        reply.status(204).send(response);
      }
      reply.status(200).send(response);
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}