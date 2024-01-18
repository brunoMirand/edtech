import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { verify, JwtPayload } from 'jsonwebtoken';
import { env } from '@/env';

export class CheckPermissionMiddleware {
  static handle(
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) {
    const token = request.headers['x-api-token'];
    if (!token) {
      reply.status(401).send({ message: 'No API token found in request.' });
    }

    try {
      const { role } = verify(String(token), env.JWT_SECRET_KEY) as TokenPayload;
      if (role !== 'admin') {
        reply.status(401).send({ message: 'User does not have permission for this feature.' });
      }

      request.role = role;
      done();
    } catch (e) {
      reply.status(401).send({ message: `Unauthorized ${e.message}.` });
    }
  }
}

type Input = {
  userId: string;
  role: 'admin' | 'student'
}

type TokenPayload = Input & JwtPayload;