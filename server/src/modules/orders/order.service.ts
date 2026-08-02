import { OrderRepository } from './order.repository.js';
import { CartRepository } from '../cart/cart.repository.js';
import { NotFoundError, BusinessRuleError } from '../../errors/AppError.js';
import type { CreateOrderInput } from './order.validator.js';

export class OrderService {
  private orderRepository = new OrderRepository();
  private cartRepository = new CartRepository();

  async createOrder(userId: string, input: CreateOrderInput) {
    const cart = await this.cartRepository.findCartByUserOrToken(userId);
    if (!cart || cart.items.length === 0) {
      throw new BusinessRuleError('Cannot checkout an empty shopping bag');
    }

    const subtotal = cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const gstAmount = Math.round(subtotal * 0.18);
    const shippingFee = subtotal > 1999 || subtotal === 0 ? 0 : 250;
    const totalAmount = subtotal + shippingFee;

    const order = await this.orderRepository.createOrder(
      userId,
      cart.items,
      input,
      subtotal,
      gstAmount,
      shippingFee,
      totalAmount
    );

    // Clear cart after checkout
    await this.cartRepository.updateCartTotals(cart.id);

    return order;
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOrderById(id);
    if (!order) {
      throw new NotFoundError(`Order "${id}" not found`);
    }
    return order;
  }

  async getUserOrders(userId: string) {
    return this.orderRepository.findOrdersByUser(userId);
  }

  async updateOrderStatus(id: string, status: any) {
    return this.orderRepository.updateOrderStatus(id, status);
  }
}
