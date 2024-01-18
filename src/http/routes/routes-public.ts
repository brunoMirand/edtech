import { FastifyInstance } from 'fastify';
import { GenerateTokenController } from '@/http/controlles/generate-token';
import { ListContentsController } from '@/http/controlles/list-contents';
import { ListContentByIdController } from '@/http/controlles/list-content-by-id';

export async function appRoutePublic(app: FastifyInstance) {
  app.post('/tokens', (new GenerateTokenController).handle);
  app.get('/contents', (new ListContentsController).handle);
  app.get('/contents/:id', (new ListContentByIdController).handle);
}
