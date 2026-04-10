"use strict"
//# sourceMappingURL=product.dto.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ProductsListResponseDto =
  exports.ProductResponseDto =
  exports.UpdateProductDto =
  exports.CreateProductDto =
  exports.productsListResponseSchema =
  exports.productResponseSchema =
  exports.updateProductSchema =
  exports.createProductSchema =
    void 0
const zod_1 = require("zod")
const nestjs_zod_1 = require("nestjs-zod")
const src_1 = require("../../../../shared/src")
exports.createProductSchema = zod_1.z.object({
  name: zod_1.z.string().min(1),
  description: zod_1.z.string().optional(),
  price: zod_1.z.number().positive(),
  stock: zod_1.z.number().int().min(0).default(0),
})
exports.updateProductSchema = exports.createProductSchema.partial()
exports.productResponseSchema = zod_1.z.object({
  id: src_1.idSchema,
  name: zod_1.z.string(),
  description: zod_1.z.string().optional(),
  price: zod_1.z.number(),
  stock: zod_1.z.number(),
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
})
exports.productsListResponseSchema = zod_1.z.object({
  data: zod_1.z.array(exports.productResponseSchema),
  total: zod_1.z.number(),
  limit: zod_1.z.number(),
  offset: zod_1.z.number(),
})
class CreateProductDto extends (0, nestjs_zod_1.createZodDto)(
  exports.createProductSchema,
) {}
exports.CreateProductDto = CreateProductDto
class UpdateProductDto extends (0, nestjs_zod_1.createZodDto)(
  exports.updateProductSchema,
) {}
exports.UpdateProductDto = UpdateProductDto
class ProductResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.productResponseSchema,
) {}
exports.ProductResponseDto = ProductResponseDto
class ProductsListResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.productsListResponseSchema,
) {}
exports.ProductsListResponseDto = ProductsListResponseDto
