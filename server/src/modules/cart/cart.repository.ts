import { prisma } from '../../config/prisma.js';

export class CartRepository {
  async findCartByUserOrToken(userId?: string, guestToken?: string) {
    if (!userId && !guestToken) return null;

    return prisma.cart.findFirst({
      where: userId ? { userId } : { guestToken },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
            variant: true,
          },
        },
      },
    });
  }

  async createCart(userId?: string, guestToken?: string) {
    return prisma.cart.create({
      data: {
        userId: userId || null,
        guestToken: guestToken || null,
      },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
            variant: true,
          },
        },
      },
    });
  }

  async addItem(cartId: string, productId: string, variantId: string | undefined, quantity: number, unitPrice: number) {
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId, variantId: variantId || null },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        variantId: variantId || null,
        quantity,
        unitPrice,
      },
    });
  }

  async updateItemQuantity(itemId: string, quantity: number) {
    if (quantity === 0) {
      return prisma.cartItem.delete({ where: { id: itemId } });
    }
    return prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async updateCartTotals(cartId: string) {
    const items = await prisma.cartItem.findMany({ where: { cartId } });
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 250;
    const total = subtotal + shipping;

    return prisma.cart.update({
      where: { id: cartId },
      data: { subtotal, total },
    });
  }
}
