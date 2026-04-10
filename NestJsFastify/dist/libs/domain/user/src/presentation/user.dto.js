import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { idSchema } from "../../../../shared/src";
export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1).max(255),
    role: z.enum(["customer", "admin"]).default("customer"),
});
export const updateUserSchema = createUserSchema.partial();
export const userResponseSchema = z.object({
    id: idSchema,
    email: z.string().email(),
    name: z.string(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export const usersListResponseSchema = z.object({
    data: z.array(userResponseSchema),
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
});
export class CreateUserDto extends createZodDto(createUserSchema) {
}
export class UpdateUserDto extends createZodDto(updateUserSchema) {
}
export class UserResponseDto extends createZodDto(userResponseSchema) {
}
export class UsersListResponseDto extends createZodDto(usersListResponseSchema) {
}
//# sourceMappingURL=user.dto.js.map