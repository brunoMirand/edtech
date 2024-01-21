import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentsController {
  constructor() { }

  async handle(request: FastifyRequest<{ Querystring: QueryParameters}>, reply: FastifyReply) {
    try {
      const { offset = 0, limit = 5 } = request.query;
      const listContents = (ContentsUseCasesFactory.make().listContents);
      const contents = await listContents.execute(Number(offset), Number(limit));
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
  offset?: number;
  limit?: number;
}
