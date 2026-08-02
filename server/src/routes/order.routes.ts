import { Router } from 'express';
import { OrderController } from '../modules/orders/order.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../middlewares/rbacMiddleware.js';

const router = Router();
const controller = new OrderController();

router.use(authMiddleware);

router.post('/', controller.createOrder);
router.get('/', controller.getUserOrders);
router.get('/:id', controller.getOrderById);

// Staff status update
router.patch(
  '/:id/status',
  rbacMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER']),
  controller.updateOrderStatus
);

export default router;
