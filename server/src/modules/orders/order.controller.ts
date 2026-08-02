import type { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service.js';
import { createOrderSchema, updateOrderStatusSchema } from './order.validator.js';
import { sendResponse } from '../../utils/responseHandler.js';

export class OrderController {
  private orderService = new OrderService();

  createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createOrderSchema.parse(req.body);
      const userId = req.user!.id;
      const order = await this.orderService.createOrder(userId, validated);
      sendResponse(res, 201, 'Order created successfully', order);
    } catch (err) {
      next(err);
    }
  };

  getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const order = await this.orderService.getOrderById(id);
      sendResponse(res, 200, 'Order details fetched successfully', order);
    } catch (err) {
      next(err);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const orders = await this.orderService.getUserOrders(userId);
      sendResponse(res, 200, 'User orders retrieved', orders);
    } catch (err) {
      next(err);
    }
  };

  updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const validated = updateOrderStatusSchema.parse(req.body);
      const order = await this.orderService.updateOrderStatus(id, validated.status);
      sendResponse(res, 200, 'Order status updated', order);
    } catch (err) {
      next(err);
    }
  };
}
