import { prisma } from '../../config/prisma.js';
import type { CreateOrderInput } from './order.validator.js';

export class OrderRepository {
  async createOrder(
    userId: string,
    cartItems: any[],
    input: CreateOrderInput,
    subtotal: number,
    gstAmount: number,
    shippingFee: number,
    totalAmount: number
  ) {
    const orderNumber = `TN-IN-${Math.floor(100000 + Math.random() * 900000)}`;

    return prisma.$transaction(async (tx) => {
      // 1. Create Address
      const address = await tx.address.create({
        data: {
          userId,
          ...input.address,
        },
      });

      // 2. Create Order
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: address.id,
          subtotal,
          gstAmount,
          shippingFee,
          totalAmount,
          companyName: input.companyName,
          gstin: input.gstin,
          status: 'CONFIRMED',
          paymentStatus: 'COMPLETED',
          trackingNumber: `BD-AIR-${Math.floor(100000 + Math.random() * 900000)}-IN`,
          items: {
            createMany: {
              data: cartItems.map((item) => ({
                productId: item.productId,
                variantId: item.variantId || null,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.unitPrice * item.quantity,
              })),
            },
          },
        },
        include: {
          items: { include: { product: true } },
          address: true,
        },
      });

      // 3. Stock Allocation / Decrement Rule: Stock decreases only after successful payment
      for (const item of cartItems) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // 4. Create Initial Payment Record
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: 'RAZORPAY',
          transactionId: `TXN-${Date.now()}`,
          amount: totalAmount,
          currency: 'INR',
          status: 'COMPLETED',
          paymentMethod: input.paymentMethod,
        },
      });

      return order;
    });
  }

  async findOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: { include: { images: true } } } },
        address: true,
        payments: true,
      },
    });
  }

  async findOrdersByUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: { include: { images: true } } } },
        address: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(id: string, status: any) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new Error('Order not found');

    // Rule: Orders become immutable after shipping (DELIVERED)
    if (order.status === 'DELIVERED') {
      throw new Error('Completed and delivered orders are immutable.');
    }

    // Rule: Cancelled orders restore inventory
    if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
      const items = await prisma.orderItem.findMany({ where: { orderId: id } });
      await prisma.$transaction(async (tx) => {
        for (const item of items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stock: { increment: item.quantity } },
            });
          }
        }
        await tx.order.update({
          where: { id },
          data: { status: 'CANCELLED', paymentStatus: 'REFUNDED' },
        });
      });
      return prisma.order.findUnique({ where: { id } });
    }

    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
