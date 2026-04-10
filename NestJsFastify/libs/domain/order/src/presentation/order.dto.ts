import { z } from "zod"
import { createZodDto } from "nestjs-zod"
import { idSchema } from "../../../../shared/src"

export const createOrderSchema = z.object({
  userId: idSchema,
  totalAmount: z.number().positive(),
  status: z.string().default("pending"),
})

export const updateOrderSchema = createOrderSchema.partial()

export const orderResponseSchema = z.object({
  id: idSchema,
  userId: idSchema,
  totalAmount: z.number(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ordersListResponseSchema = z.object({
  data: z.array(orderResponseSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
})

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
export class UpdateOrderDto extends createZodDto(updateOrderSchema) {}
export class OrderResponseDto extends createZodDto(orderResponseSchema) {}
export class OrdersListResponseDto extends createZodDto(
  ordersListResponseSchema,
) {}
