import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentsController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { offset, limit } = request.query;
      const listContents = (ContentsUseCasesFactory.make().listContents);
      if (!offset || !limit) {
        const contents = await listContents.execute();
        reply.status(200).send(contents);
      }

      const contents = await listContents.execute(Number(offset), Number(limit));
      reply.status(200).send(contents);
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}
