import { FastifyInstance } from 'fastify';
import { GenerateTokenController } from '@/http/controllers/generate-token';
import { HealthcheckController } from '@/http/controllers/healthcheck';

export async function appRoutePublic(app: FastifyInstance) {
  app.post('/tokens', (new GenerateTokenController).handle);
  app.get('/healthcheck', (new HealthcheckController).handle);
}
