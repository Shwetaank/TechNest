import type { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service.js';
import { sendResponse } from '../../utils/responseHandler.js';

export class AnalyticsController {
  private analyticsService = new AnalyticsService();

  getDashboardMetrics = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metrics = await this.analyticsService.getDashboardMetrics();
      sendResponse(res, 200, 'Dashboard analytics retrieved', metrics);
    } catch (err) {
      next(err);
    }
  };
}
