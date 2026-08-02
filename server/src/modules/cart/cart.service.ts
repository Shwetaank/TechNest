import { CartRepository } from './cart.repository.js';
import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../errors/AppError.js';
import type { AddToCartInput } from './cart.validator.js';

export class CartService {
  private cartRepository = new CartRepository();

  async getCart(userId?: string, guestToken?: string) {
    let cart = await this.cartRepository.findCartByUserOrToken(userId, guestToken);
    if (!cart) {
      cart = await this.cartRepository.createCart(userId, guestToken);
    }
    return cart;
  }

  async addToCart(input: AddToCartInput, userId?: string) {
    const product = await prisma.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new NotFoundError(`Product not found`);
    }

    let cart = await this.cartRepository.findCartByUserOrToken(userId, input.guestToken);
    if (!cart) {
      cart = await this.cartRepository.createCart(userId, input.guestToken);
    }

    await this.cartRepository.addItem(
      cart.id,
      input.productId,
      input.variantId,
      input.quantity,
      product.price
    );

    await this.cartRepository.updateCartTotals(cart.id);
    return this.cartRepository.findCartByUserOrToken(userId, input.guestToken);
  }

  async updateItemQuantity(itemId: string, quantity: number, userId?: string, guestToken?: string) {
    await this.cartRepository.updateItemQuantity(itemId, quantity);
    const cart = await this.cartRepository.findCartByUserOrToken(userId, guestToken);
    if (cart) {
      await this.cartRepository.updateCartTotals(cart.id);
    }
    return cart;
  }
}
