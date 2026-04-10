"use strict"
//# sourceMappingURL=order.repository.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.OrderRepository = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const drizzle_orm_1 = require("drizzle-orm")
const src_1 = require("../../../../core/src")
const src_2 = require("../../../../infrastructure/database/src")
const order_entity_1 = require("../domain/order.entity")
let OrderRepository = class OrderRepository {
  constructor(databaseService) {
    this.databaseService = databaseService
  }
  async findAll(limit, offset) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.orders)
      .limit(limit)
      .offset(offset)
    return result.map(order_entity_1.Order.fromDb)
  }
  async findById(id) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.orders)
      .where((0, drizzle_orm_1.eq)(src_2.orders.id, id))
      .limit(1)
    return result.length >
      0
      ? order_entity_1.Order.fromDb(result[0])
      : null
  }
  async create(orderData) {
    const result = await this.databaseService.db
      .insert(src_2.orders)
      .values(orderData)
      .returning()
    return order_entity_1.Order.fromDb(result[0])
  }
  async update(id, orderData) {
    const result = await this.databaseService.db
      .update(src_2.orders)
      .set(orderData)
      .where((0, drizzle_orm_1.eq)(src_2.orders.id, id))
      .returning()
    return result.length >
      0
      ? order_entity_1.Order.fromDb(result[0])
      : null
  }
  async delete(id) {
    const result = await this.databaseService.db
      .delete(src_2.orders)
      .where((0, drizzle_orm_1.eq)(src_2.orders.id, id))
      .returning({ id: src_2.orders.id })
    return (
      result.length >
      0
    )
  }
}
exports.OrderRepository = OrderRepository
exports.OrderRepository = OrderRepository = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [src_1.DatabaseService]),
  ],
  OrderRepository,
)
