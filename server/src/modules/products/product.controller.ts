import type { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service.js';
import { createProductSchema, productQuerySchema } from './product.validator.js';
import { sendResponse } from '../../utils/responseHandler.js';

export class ProductController {
  private productService = new ProductService();

  getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryParams = productQuerySchema.parse(req.query);
      const result = await this.productService.getProducts(queryParams);
      sendResponse(res, 200, 'Products retrieved successfully', result.products, {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      });
    } catch (err) {
      next(err);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const product = await this.productService.getProductById(id);
      sendResponse(res, 200, 'Product details fetched successfully', product);
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createProductSchema.parse(req.body);
      const product = await this.productService.createProduct(validated);
      sendResponse(res, 201, 'Product created successfully', product);
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      await this.productService.deleteProduct(id);
      sendResponse(res, 200, 'Product soft deleted successfully');
    } catch (err) {
      next(err);
    }
  };
}
