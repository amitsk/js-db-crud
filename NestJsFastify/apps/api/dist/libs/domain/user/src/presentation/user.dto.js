"use strict"
//# sourceMappingURL=user.dto.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.UsersListResponseDto =
  exports.UserResponseDto =
  exports.UpdateUserDto =
  exports.CreateUserDto =
  exports.usersListResponseSchema =
  exports.userResponseSchema =
  exports.updateUserSchema =
  exports.createUserSchema =
    void 0
const zod_1 = require("zod")
const nestjs_zod_1 = require("nestjs-zod")
const src_1 = require("../../../../shared/src")
exports.createUserSchema = zod_1.z.object({
  email: zod_1.z.string().email(),
  password: zod_1.z.string().min(8),
  name: zod_1.z.string().min(1).max(255),
  role: zod_1.z.enum(["customer", "admin"]).default("customer"),
})
exports.updateUserSchema = exports.createUserSchema.partial()
exports.userResponseSchema = zod_1.z.object({
  id: src_1.idSchema,
  email: zod_1.z.string().email(),
  name: zod_1.z.string(),
  role: zod_1.z.string(),
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
})
exports.usersListResponseSchema = zod_1.z.object({
  data: zod_1.z.array(exports.userResponseSchema),
  total: zod_1.z.number(),
  limit: zod_1.z.number(),
  offset: zod_1.z.number(),
})
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(
  exports.createUserSchema,
) {}
exports.CreateUserDto = CreateUserDto
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(
  exports.updateUserSchema,
) {}
exports.UpdateUserDto = UpdateUserDto
class UserResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.userResponseSchema,
) {}
exports.UserResponseDto = UserResponseDto
class UsersListResponseDto extends (0, nestjs_zod_1.createZodDto)(
  exports.usersListResponseSchema,
) {}
exports.UsersListResponseDto = UsersListResponseDto
