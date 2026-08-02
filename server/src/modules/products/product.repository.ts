import { prisma } from '../../config/prisma.js';
import type { CreateProductInput, ProductQueryParams } from './product.validator.js';

export class ProductRepository {
  async findMany(params: ProductQueryParams) {
    const { search, category, brand, minPrice, maxPrice, sortBy, page, limit } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'All') {
      where.category = { slug: category };
    }

    if (brand && brand !== 'All') {
      where.brand = { slug: brand };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price-low') orderBy = { price: 'asc' };
    if (sortBy === 'price-high') orderBy = { price: 'desc' };
    if (sortBy === 'rating') orderBy = { rating: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          images: true,
          variants: {
            include: { inventory: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        brand: true,
        category: true,
        images: true,
        variants: {
          include: { inventory: true },
        },
        reviews: {
          include: { user: true, images: true },
        },
      },
    });
  }

  async create(input: CreateProductInput) {
    const { images, ...productData } = input;
    return prisma.product.create({
      data: {
        ...productData,
        images: images
          ? {
              createMany: {
                data: images.map((img, idx) => ({
                  url: img.url,
                  altText: img.altText || input.name,
                  isPrimary: img.isPrimary || idx === 0,
                  displayOrder: idx,
                })),
              },
            }
          : undefined,
      },
      include: {
        brand: true,
        category: true,
        images: true,
      },
    });
  }

  async deleteSoft(id: string) {
    // Check if referenced by existing orders
    const count = await prisma.orderItem.count({ where: { productId: id } });
    if (count > 0) {
      throw new Error('Product cannot be deleted because it is referenced in existing orders.');
    }

    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
