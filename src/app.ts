import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { appRoutePublic, appRouteProtected } from '@/http/routes';

export const app = fastify();

app.register(cookie);
app.register(appRoutePublic);
app.register(appRouteProtected);
