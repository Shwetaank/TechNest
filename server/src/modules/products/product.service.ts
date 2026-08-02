import { ProductRepository } from './product.repository.js';
import { NotFoundError, BusinessRuleError } from '../../errors/AppError.js';
import { redis } from '../../config/redis.js';
import { logger } from '../../utils/logger.js';
import type { CreateProductInput, ProductQueryParams } from './product.validator.js';

export class ProductService {
  private productRepository = new ProductRepository();

  async getProducts(params: ProductQueryParams) {
    const cacheKey = `products:${JSON.stringify(params)}`;

    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.debug({ cacheKey }, '⚡ Serving product catalog from Redis Cache');
        return JSON.parse(cached);
      }
    } catch (e) {
      // Fallback silently if Redis is offline
    }

    const result = await this.productRepository.findMany(params);

    try {
      await redis.setex(cacheKey, 300, JSON.stringify(result)); // Cache for 5 mins
    } catch (e) {
      // Ignore cache write errors
    }

    return result;
  }

  async getProductById(id: string) {
    const cacheKey = `product:${id}`;

    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.debug({ cacheKey }, '⚡ Serving single product from Redis Cache');
        return JSON.parse(cached);
      }
    } catch (e) {
      // Ignore Redis offline
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError(`Product with ID "${id}" not found`);
    }

    try {
      await redis.setex(cacheKey, 600, JSON.stringify(product)); // Cache for 10 mins
    } catch (e) {
      // Ignore cache write errors
    }

    return product;
  }

  async createProduct(input: CreateProductInput) {
    const product = await this.productRepository.create(input);
    this.invalidateProductCache();
    return product;
  }

  async deleteProduct(id: string) {
    try {
      const result = await this.productRepository.deleteSoft(id);
      this.invalidateProductCache(id);
      return result;
    } catch (err: any) {
      throw new BusinessRuleError(err.message || 'Failed to delete product');
    }
  }

  private async invalidateProductCache(productId?: string) {
    try {
      if (productId) {
        await redis.del(`product:${productId}`);
      }
      const keys = await redis.keys('products:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (e) {
      // Ignore cache clear failures
    }
  }
}
