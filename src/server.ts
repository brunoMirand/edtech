import { app } from '@/app';
import { env } from '@/env';
import { PinoLogger } from '@/infra/logger/pino-logger';

const logger = new PinoLogger();

const startServer = async () => {
  app.listen({
    host: '0.0.0.0',
    port: env.PORT,
  }).then(() => {
    logger.info('HTTP Server Running', { host: '0.0.0.0', port: env.PORT });
  });
};

(async () => {
  await startServer();
})();
