import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 chars'),
  brandId: z.string().uuid('Valid Brand UUID required'),
  categoryId: z.string().uuid('Valid Category UUID required'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional(),
  emiStartingAt: z.number().positive().optional(),
  isFeatured: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  isFlashSale: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  images: z
    .array(
      z.object({
        url: z.string().url('Invalid image URL'),
        altText: z.string().optional(),
        isPrimary: z.boolean().optional(),
      })
    )
    .optional(),
});

export const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(['featured', 'price-low', 'price-high', 'rating']).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductQueryParams = z.infer<typeof productQuerySchema>;
