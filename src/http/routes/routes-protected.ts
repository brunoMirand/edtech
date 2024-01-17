import { FastifyInstance } from 'fastify';
import { CreateContentController } from '@/http/controlles/create-content';
import { CheckPermissionMiddleware } from '@/http/middlewares/check-permission';

export async function appRouteProtected(app: FastifyInstance) {
  app.addHook('preHandler', CheckPermissionMiddleware.handle);
  app.post('/contents', (new CreateContentController).handle);
}