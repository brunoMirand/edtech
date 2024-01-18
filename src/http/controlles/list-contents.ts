import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';

export class ListContentsController {
  constructor() { }

  async handle(_: FastifyRequest, reply: FastifyReply) {
    try {
      const listContents = (ContentsUseCasesFactory.make().listContents);
      const contents = await listContents.execute();
      reply.status(200).send(contents);
    } catch (e) {
      reply.status(400).send(e.message);
    }
  }
}
