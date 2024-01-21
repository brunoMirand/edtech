import Redis from 'ioredis';
import { Cache } from '@/infra/cache/interface';

export class RedisCache implements Cache {
  private readonly client;

  constructor() {
    this.client = new Redis();
  }

  async set(key: string, data: string) {
    await this.client.set(key, data);
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}
