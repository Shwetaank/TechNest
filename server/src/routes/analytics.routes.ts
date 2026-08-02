import { Router } from 'express';
import { AnalyticsController } from '../modules/analytics/analytics.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../middlewares/rbacMiddleware.js';

const router = Router();
const controller = new AnalyticsController();

router.get(
  '/dashboard',
  authMiddleware,
  rbacMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER']),
  controller.getDashboardMetrics
);

export default router;
