import { z } from 'zod';

export const createOrderSchema = z.object({
  address: z.object({
    fullName: z.string().min(2, 'Full name required'),
    phone: z.string().min(10, 'Valid 10-digit phone number required'),
    street: z.string().min(3, 'Street address required'),
    pincode: z.string().length(6, 'Pincode must be 6 digits'),
    city: z.string().min(2, 'City required'),
    state: z.string().min(2, 'State required'),
    country: z.string().default('India'),
  }),
  companyName: z.string().optional(),
  gstin: z.string().optional(),
  paymentMethod: z.enum(['UPI', 'CARD', 'EMI', 'COD']).default('UPI'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'DISPATCHED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED',
  ]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
