import { app } from '@/app';
import { env } from '@/env';
import { prisma } from '@/infra/database/prisma';
import { PinoLogger } from '@/infra/logger/pino-logger';
import { connectionTestRedisClient } from '@/infra/cache/redis-connections-test';

const logger = new PinoLogger();

const initializeDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to the database', {});
  } catch (e) {
    logger.error('Error connecting to the database:', {extras: { error: e }});
  }
};

const initializeRedis = async () => {
  const redis = connectionTestRedisClient();
  try {
    await redis.ping();
    logger.info('Connected to the redis', {});
  } catch (error) {
    logger.error('Error connecting to the redis:', {extras: { error: e }});
  }
};

const startServer = async () => {
  await initializeDatabase();
  await initializeRedis();
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
