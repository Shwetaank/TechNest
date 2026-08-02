import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().uuid('Valid Product UUID required'),
  variantId: z.string().uuid('Valid Variant UUID required').optional(),
  quantity: z.number().int().positive('Quantity must be at least 1').default(1),
  guestToken: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().nonnegative('Quantity cannot be negative'),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
