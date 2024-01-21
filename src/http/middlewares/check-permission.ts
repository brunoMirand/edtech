import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { Acl } from 'acl';
import { Acls } from '@/http/validations/acls';
import { Logger } from '@/infra/logger/logger';

export class CheckPermissionMiddleware extends Acls {
  constructor(protected acl: Acl, private logger: Logger) {
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
        this.logger.error('User does not have permission for this feature.', { extras: user });
        reply.status(403).send({ message: 'User does not have permission for this feature.' });
      }

      done();
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Unauthorized ${e.message}`);
        reply.status(401).send({ message: `Unauthorized ${e.message}.` });
      }

      throw e;
    }
  }

  async hasAccessPermission(role: string, resource: string, method: string) {
    return await super.hasAccessPermission(role, resource, method);
  }
}
