import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { getContentVisited, setContentVisited } from '@/helpers/cookies-content-visited';

export class ListContentByIdController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const contentViewed = getContentVisited(request);

      const listContentById = (ContentsUseCasesFactory.make()).listContentById;
      const response = await listContentById.execute(id, contentViewed);
      if (!response) {
        reply.status(204).send(response);
      }
      setContentVisited(reply, id, contentViewed);
      reply.status(200).send(response);
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}
