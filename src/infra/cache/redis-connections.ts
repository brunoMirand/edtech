import Redis from 'ioredis';

export const connectionRedisClient = () => new Redis();
