import { FastifyInstance } from 'fastify';
import { GenerateTokenController } from '@/http/controllers/generate-token';

export async function appRoutePublic(app: FastifyInstance) {
  app.post('/tokens', (new GenerateTokenController).handle);
}
