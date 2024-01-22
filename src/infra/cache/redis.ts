import { Cache } from '@/infra/cache/interface';
import { connectionRedisClient } from '@/infra/cache/redis-connections';
import { connectionTestRedisClient } from '@/infra/cache/redis-connections-test';
import { env } from '@/env';

export class RedisCache implements Cache {
  private readonly client;

  constructor() {
    if (env.NODE_ENV !== 'test') {
      this.client = connectionRedisClient();
    } else {
      this.client = connectionTestRedisClient();
    }
  }

  async set(key: string, data: string) {
    await this.client.set(key, data);
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async delete(key: string) {
    const keys = await this.client.keys(key);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }
}
