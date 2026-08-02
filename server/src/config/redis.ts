import { Redis } from 'ioredis';
import { config } from './index.js';

class InMemoryCache {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async setex(key: string, seconds: number, value: string): Promise<'OK'> {
    this.store.set(key, { value, expiresAt: Date.now() + seconds * 1000 });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let count = 0;
    for (const key of keys) {
      if (this.store.delete(key)) count++;
    }
    return count;
  }

  async keys(pattern: string): Promise<string[]> {
    const prefix = pattern.replace('*', '');
    return Array.from(this.store.keys()).filter((k) => k.startsWith(prefix));
  }
}

const memoryCache = new InMemoryCache();
let isRedisAvailable = false;

const realRedis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 1,
  retryStrategy(times) {
    if (times > 2) {
      return null; // Stop retrying after 2 attempts
    }
    return 1000;
  },
  lazyConnect: true,
});

realRedis.on('connect', () => {
  isRedisAvailable = true;
  console.log('⚡ Redis Cache Connected Successfully');
});

realRedis.on('error', () => {
  isRedisAvailable = false;
});

// Resilient Cache Proxy: routes to Redis if online, otherwise in-memory Map
export const redis = {
  async get(key: string): Promise<string | null> {
    if (isRedisAvailable) {
      try {
        return await realRedis.get(key);
      } catch (e) {
        isRedisAvailable = false;
      }
    }
    return memoryCache.get(key);
  },

  async setex(key: string, seconds: number, value: string): Promise<'OK'> {
    if (isRedisAvailable) {
      try {
        return await realRedis.setex(key, seconds, value);
      } catch (e) {
        isRedisAvailable = false;
      }
    }
    return memoryCache.setex(key, seconds, value);
  },

  async del(...keys: string[]): Promise<number> {
    if (isRedisAvailable) {
      try {
        return await realRedis.del(...keys);
      } catch (e) {
        isRedisAvailable = false;
      }
    }
    return memoryCache.del(...keys);
  },

  async keys(pattern: string): Promise<string[]> {
    if (isRedisAvailable) {
      try {
        return await realRedis.keys(pattern);
      } catch (e) {
        isRedisAvailable = false;
      }
    }
    return memoryCache.keys(pattern);
  },
};
