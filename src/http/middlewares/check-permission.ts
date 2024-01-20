import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { Acl } from 'acl';
import { Acls } from '@/http/validations/acls';

export class CheckPermissionMiddleware extends Acls {
  constructor(protected acl: Acl) {
    super(acl);
  }

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) {
    try {
      await request.jwtVerify();
      const { routeOptions: { url }, method, user } = request;
      const isAllowed = await this.hasAccessPermission(user.role, url, method);
      if (!isAllowed) {
        reply.status(403).send({ message: 'User does not have permission for this feature.' });
      }

      done();
    } catch (e) {
      reply.status(401).send({ message: `Unauthorized ${e.message}.` });
    }
  }

  async hasAccessPermission(role: string, resource: string, method: string) {
    return await super.hasAccessPermission(role, resource, method);
  }
}
