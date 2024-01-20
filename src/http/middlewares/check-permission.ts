import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { verify, JwtPayload } from 'jsonwebtoken';
import { Acl } from 'acl';
import { env } from '@/env';
import { Permissions } from '@/domain/permissions';

export class CheckPermissionMiddleware extends Permissions {
  constructor(protected acl: Acl) {
    super(acl);
  }

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) {
    const token = request.headers['x-api-token'];
    if (!token) {
      reply.status(401).send({ message: 'No API token found in request.' });
    }

    try {
      const { role, userId } = verify(String(token), env.JWT_SECRET_KEY) as TokenPayload;
      const { routeOptions: { url }, method } = request;

      const isAllowed = await this.hasAccessPermission(role, url, method);
      if (!isAllowed) {
        reply.status(403).send({ message: 'User does not have permission for this feature.' });
      }

      request.role = role;
      request.userId = userId;
      done();
    } catch (e) {
      reply.status(401).send({ message: `Unauthorized ${e.message}.` });
    }
  }

  async hasAccessPermission(role: string, resource: string, method: string) {
    return await super.hasAccessPermission(role, resource, method);
  }
}

type Input = {
  userId: string;
  role: 'admin' | 'student'
}

type TokenPayload = Input & JwtPayload;