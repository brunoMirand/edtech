import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentsController {
  constructor() { }

  async handle(request: FastifyRequest<{ Querystring: QueryParameters }>, reply: FastifyReply) {
    try {
      const { page = 1 } = request.query;
      const listContents = (ContentsUseCasesFactory.make().listContents);
      const contents = await listContents.execute(page);
      reply.status(200).send(contents);
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ message: e.message });
      }

      throw e;
    }
  }
}

type QueryParameters = {
  page?: number;
}
