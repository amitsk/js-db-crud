import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  userId: z.number().int().positive(),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).optional().default('pending'),
});

export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).optional(),
});

export const orderIdParamSchema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
});

export const listOrdersQuerySchema = z.object({
  limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).optional().default('10'),
  offset: z.string().transform(Number).pipe(z.number().int().nonnegative()).optional().default('0'),
  userId: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).optional(),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;
