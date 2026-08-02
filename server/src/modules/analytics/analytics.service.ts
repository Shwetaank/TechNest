import { prisma } from '../../config/prisma.js';

export class AnalyticsService {
  async getDashboardMetrics() {
    const [totalOrders, totalRevenue, totalCustomers, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.user.count(),
      prisma.product.count({ where: { deletedAt: null } }),
    ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { fullName: true, email: true } },
        items: { include: { product: true } },
      },
    });

    return {
      revenueTotal: totalRevenue._sum.totalAmount || 0,
      formattedRevenue: `₹${((totalRevenue._sum.totalAmount || 0) / 10000000).toFixed(2)} Crore`,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
    };
  }
}
