import fastify from 'fastify';
import { appRoutePublic, appRouteProtected } from '@/http/routes';

export const app = fastify();

app.register(appRoutePublic);
app.register(appRouteProtected);
