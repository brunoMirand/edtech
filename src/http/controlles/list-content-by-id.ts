import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { ContentsUseCasesFactory } from '@/use-cases/factories/contents/make-use-cases';
import { contentSchemaId } from '@/http/validations/schema';

export class ListContentByIdController {
  constructor() { }

  async handle(request: FastifyRequest<{ Params: Parameters}>, reply: FastifyReply) {
    try {
      const { user: { sub } } = request;
      const id = contentSchemaId.parse(request.params.id);
      const listContentById = (ContentsUseCasesFactory.make()).listContentById;
      const response = await listContentById.execute(id, sub);
      reply.status(200).send(response);
    } catch (e) {
      if (e instanceof ZodError) {
        reply.status(422).send({ message: JSON.parse(e.message) });
      }
      if (e instanceof Error) {
        reply.status(400).send({ message: e.message });
      }

      throw e;
    }
  }
}

type Parameters = {
  id: string;
}
