"use strict"
//# sourceMappingURL=user.controller.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.UserController = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const user_service_1 = require("../application/user.service")
const user_dto_1 = require("./user.dto")
const src_1 = require("../../../../core/src")
let UserController = class UserController {
  constructor(userService) {
    this.userService = userService
  }
  async findAll(query) {
    const { limit, offset } = (0, src_1.getPaginationOptions)(query)
    const users = await this.userService.findAll(limit, offset)
    return {
      data: users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      total: users.length,
      limit,
      offset,
    }
  }
  async findById(id) {
    const user = await this.userService.findById(parseInt(id))
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  async create(createUserDto) {
    const user = await this.userService.create({
      email: createUserDto.email,
      passwordHash: createUserDto.password,
      name: createUserDto.name,
      role: createUserDto.role,
    })
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  async update(id, updateUserDto) {
    const user = await this.userService.update(parseInt(id), updateUserDto)
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  async delete(id) {
    const success = await this.userService.delete(parseInt(id))
    return { success }
  }
}
exports.UserController = UserController
tslib_1.__decorate(
  [
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "findAll",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Get)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "findById",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "create",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Put)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "update",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Delete)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "delete",
  null,
)
exports.UserController = UserController = tslib_1.__decorate(
  [
    (0, common_1.Controller)("api/users"),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService]),
  ],
  UserController,
)
