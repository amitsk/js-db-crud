"use strict"
//# sourceMappingURL=order.dto.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.OrdersListResponseDto =
  exports.OrderResponseDto =
  exports.UpdateOrderDto =
  exports.CreateOrderDto =
  exports.ordersListResponseSchema =
  exports.orderResponseSchema =
  exports.updateOrderSchema =
  exports.createOrderSchema =
    void 0
const zod_1 = require("zod")
const nestjs_zod_1 = require("nestjs-zod")
const src_1 = require("../../../../shared/src")
exports.createOrderSchema = zod_1.z.object({
  userId: src_1.idSchema,
  totalAmount: zod_1.z.number().positive(),
  status: zod_1.z.string().default("pending"),
})
exports.updateOrderSchema = exports.createOrderSchema.partial()
exports.orderResponseSchema = zod_1.z.object({
  id: src_1.idSchema,
  userId: src_1.idSchema,
  totalAmount: zod_1.z.number(),
  status: zod_1.z.string(),
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
})
exports.ordersListResponseSchema = zod_1.z.object({
  data: zod_1.z.array(exports.orderResponseSchema),
  total: zod_1.z.number(),
  limit: zod_1.z.number(),
  offset: zod_1.z.number(),
})
class CreateOrderDto extends (0, nestjs_zod_1.createZodDto)(
  exports.createOrderSchema,
) {}
exports.CreateOrderDto = CreateOrderDto
class UpdateOrderDto extends (0, nestjs_zod_1.createZodDto)(
  exports.updateOrderSchema,
) {}
exports.UpdateOrderDto = UpdateOrderDto
class OrderResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.orderResponseSchema,
) {}
exports.OrderResponseDto = OrderResponseDto
class OrdersListResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.ordersListResponseSchema,
) {}
exports.OrdersListResponseDto = OrdersListResponseDto
