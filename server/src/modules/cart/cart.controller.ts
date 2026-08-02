import type { Request, Response, NextFunction } from 'express';
import { CartService } from './cart.service.js';
import { addToCartSchema, updateCartItemSchema } from './cart.validator.js';
import { sendResponse } from '../../utils/responseHandler.js';

export class CartController {
  private cartService = new CartService();

  getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      const guestToken = req.query.guestToken ? String(req.query.guestToken) : undefined;
      const cart = await this.cartService.getCart(userId, guestToken);
      sendResponse(res, 200, 'Cart retrieved successfully', cart);
    } catch (err) {
      next(err);
    }
  };

  addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = addToCartSchema.parse(req.body);
      const userId = req.user?.id;
      const cart = await this.cartService.addToCart(validated, userId);
      sendResponse(res, 200, 'Item added to cart', cart);
    } catch (err) {
      next(err);
    }
  };

  updateItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = String(req.params.itemId);
      const validated = updateCartItemSchema.parse(req.body);
      const userId = req.user?.id;
      const guestToken = req.query.guestToken ? String(req.query.guestToken) : undefined;
      const cart = await this.cartService.updateItemQuantity(itemId, validated.quantity, userId, guestToken);
      sendResponse(res, 200, 'Cart item quantity updated', cart);
    } catch (err) {
      next(err);
    }
  };
}
