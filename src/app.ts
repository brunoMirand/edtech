import fastify from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { ZodError } from 'zod';
import { env } from '@/env';
import { appRoutePublic, appRouteProtected } from '@/http/routes';


export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY
});

app.register(appRoutePublic);
app.register(appRouteProtected);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.issues });
  }
  return reply.status(500).send({ message: 'Internal server error' });
});
