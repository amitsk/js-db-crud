"use strict"
//# sourceMappingURL=user.repository.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.UserRepository = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const drizzle_orm_1 = require("drizzle-orm")
const src_1 = require("../../../../core/src")
const src_2 = require("../../../../infrastructure/database/src")
const user_entity_1 = require("../domain/user.entity")
let UserRepository = class UserRepository {
  constructor(databaseService) {
    this.databaseService = databaseService
  }
  async findAll(limit, offset) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.users)
      .limit(limit)
      .offset(offset)
    return result.map(user_entity_1.User.fromDb)
  }
  async findById(id) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.users)
      .where((0, drizzle_orm_1.eq)(src_2.users.id, id))
      .limit(1)
    return result.length >
      0
      ? user_entity_1.User.fromDb(result[0])
      : null
  }
  async findByEmail(email) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.users)
      .where((0, drizzle_orm_1.eq)(src_2.users.email, email))
      .limit(1)
    return result.length >
      0
      ? user_entity_1.User.fromDb(result[0])
      : null
  }
  async create(userData) {
    const result = await this.databaseService.db
      .insert(src_2.users)
      .values(userData)
      .returning()
    return user_entity_1.User.fromDb(result[0])
  }
  async update(id, userData) {
    const result = await this.databaseService.db
      .update(src_2.users)
      .set(userData)
      .where((0, drizzle_orm_1.eq)(src_2.users.id, id))
      .returning()
    return result.length >
      0
      ? user_entity_1.User.fromDb(result[0])
      : null
  }
  async delete(id) {
    const result = await this.databaseService.db
      .delete(src_2.users)
      .where((0, drizzle_orm_1.eq)(src_2.users.id, id))
      .returning({ id: src_2.users.id })
    return (
      result.length >
      0
    )
  }
}
exports.UserRepository = UserRepository
exports.UserRepository = UserRepository = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [src_1.DatabaseService]),
  ],
  UserRepository,
)
