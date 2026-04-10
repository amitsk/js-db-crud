import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { idSchema } from "../../../../shared/src";
export const createProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().min(0).default(0),
});
export const updateProductSchema = createProductSchema.partial();
export const productResponseSchema = z.object({
    id: idSchema,
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    stock: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export const productsListResponseSchema = z.object({
    data: z.array(productResponseSchema),
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
});
export class CreateProductDto extends createZodDto(createProductSchema) {
}
export class UpdateProductDto extends createZodDto(updateProductSchema) {
}
export class ProductResponseDto extends createZodDto(productResponseSchema) {
}
export class ProductsListResponseDto extends createZodDto(productsListResponseSchema) {
}
//# sourceMappingURL=product.dto.js.map