import { z } from "zod";
export const idSchema = z.coerce.number().int().positive();
export const paginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(10),
    offset: z.coerce.number().int().min(0).default(0),
});
export const baseEntitySchema = z.object({
    id: idSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=index.js.map