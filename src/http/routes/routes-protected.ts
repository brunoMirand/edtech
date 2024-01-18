import { FastifyInstance } from 'fastify';
import { CheckPermissionMiddleware } from '@/http/middlewares/check-permission';
import { CreateContentController } from '@/http/controlles/create-content';
import { UpdateContentController } from '@/http/controlles/update-content';

export async function appRouteProtected(app: FastifyInstance) {
  app.addHook('preHandler', CheckPermissionMiddleware.handle);
  app.post('/contents', (new CreateContentController).handle);
  app.put('/contents/:id', (new UpdateContentController).handle);
}
