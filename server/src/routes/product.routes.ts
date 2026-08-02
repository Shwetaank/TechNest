import { Router } from 'express';
import { ProductController } from '../modules/products/product.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../middlewares/rbacMiddleware.js';

const router = Router();
const controller = new ProductController();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);

// Admin-only endpoints
router.post(
  '/',
  authMiddleware,
  rbacMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER']),
  controller.createProduct
);

router.delete(
  '/:id',
  authMiddleware,
  rbacMiddleware(['SUPER_ADMIN', 'ADMIN']),
  controller.deleteProduct
);

export default router;
