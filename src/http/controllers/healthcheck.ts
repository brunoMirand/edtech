import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/infra/database/prisma';
import { connectionRedisClient } from '@/infra/cache/redis-connections';
import { logger } from '@/infra/logger/pino-connect';

export class HealthcheckController {
  constructor() { }

  async handle(_: FastifyRequest, reply: FastifyReply) {
    try {
      const database = await initializeDatabase();
      const redis = await initializeRedis();

      const dependencies = [
        {
          type: 'database',
          critical: true,
          up: database,
        }, {
          type: 'redis',
          critical: false,
          up: redis,
        }
      ];

      const hasCriticalDependencyDown = dependencies.find(
        dependency => dependency.critical === true && dependency.up === false
      );
      if (hasCriticalDependencyDown) {
        logger.error('service Unavailable:', { extras: { dependencies } });
        reply.status(503).send({ dependencies });
      }
      reply.status(200).send({ dependencies });
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ message: e.message });
      }

      throw e;
    }
  }
}

const initializeDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to the database', {});
    return true;
  } catch (e) {
    logger.error('Error connecting to the database:', { extras: { error: e } });
    return false;
  }
};

const initializeRedis = async () => {
  const redis = connectionRedisClient();
  try {
    await redis.ping();
    logger.info('Connected to the redis', {});
    return true;
  } catch (e) {
    logger.error('Error connecting to the redis:', { extras: { error: e } });
    return false;
  }
};
