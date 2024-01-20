import fastify from 'fastify';
import {fastifyJwt} from '@fastify/jwt';
import { env } from '@/env';
import { appRoutePublic, appRouteProtected } from '@/http/routes';


export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY
});

app.register(appRoutePublic);
app.register(appRouteProtected);
