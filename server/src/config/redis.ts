import { Redis } from 'ioredis';
import { config } from './index.js';

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
});

redis.on('connect', () => {
  console.log('⚡ Redis Cache & Queue Connected Successfully');
});

redis.on('error', (err) => {
  console.warn('⚠️ Redis Connection Error (Fallback to memory mode if offline):', err.message);
});
