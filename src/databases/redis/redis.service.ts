import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

export const DEFAULT_CACHE_TIME = 60 * 5;

@Injectable()
export class RedisService {
  private redisClient: any;

  constructor() {}

  onModuleInit() {
    this.redisClient = createClient({
      url: 'redis://localhost:6379',
    });
    this.redisClient.on('error', this.handleError);
    this.redisClient.connect();
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(
    key: string,
    value: string,
    expiresIn: number = DEFAULT_CACHE_TIME,
  ): Promise<void> {
    await this.redisClient.set(key, value, { EX: expiresIn });
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async getCachedData(
    key: string,
    fetchFunction: () => Promise<any>,
    ex: number = DEFAULT_CACHE_TIME,
  ) {
    const cache = await this.redisClient.get(key);
    if (cache) return JSON.parse(cache);

    const data = await fetchFunction();
    this.set(key, JSON.stringify(data), ex).catch(console.error);
    return data;
  }

  handleError(error: Error): void {
    console.error('Redis error: ', error.message);
  }
}
