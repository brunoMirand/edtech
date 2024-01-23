import { FastifyRequest, FastifyReply } from 'fastify';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { UnableCreateContentError } from '@/use-cases/errors/contents-errors';
import { contentSchemaBody } from '@/http/validations/schema';

export class CreateContentController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { body } = request;
      const input = contentSchemaBody.parse(body);
      const createContent = (ContentsUseCasesFactory.make()).createContent;
      const response = await createContent.execute(input);
      return reply.status(201).send(response);
    } catch (e) {
      if (e instanceof UnableCreateContentError) {
        return reply.status(422).send({ message: e.message });
      }
      throw e;
    }
  }
}
