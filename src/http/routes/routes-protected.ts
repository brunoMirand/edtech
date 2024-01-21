import { FastifyInstance } from 'fastify';
import acl from 'acl';
import { CheckPermissionMiddleware } from '@/http/middlewares/check-permission';
import { CreateContentController } from '@/http/controlles/create-content';
import { UpdateContentController } from '@/http/controlles/update-content';
import { RemoveContentController } from '@/http/controlles/remove-content';
import { ListContentsController } from '@/http/controlles/list-contents';
import { ListContentByIdController } from '@/http/controlles/list-content-by-id';
import { PinoLogger } from '@/infra/logger/pino-logger';

export async function appRouteProtected(app: FastifyInstance) {
  const aclInstance = new acl(new acl.memoryBackend());
  const logger = new PinoLogger();

  const checkPermissionMiddleware = new CheckPermissionMiddleware(aclInstance, logger);
  app.addHook('preHandler', (request, reply, done) => {
    checkPermissionMiddleware.handle(request, reply, done);
  });

  app.post('/contents', (new CreateContentController).handle);
  app.put('/contents/:id', (new UpdateContentController).handle);
  app.delete('/contents/:id', (new RemoveContentController).handle);
  app.get('/contents', (new ListContentsController).handle);
  app.get('/contents/:id', (new ListContentByIdController).handle);
}
