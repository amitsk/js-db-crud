"use strict"
//# sourceMappingURL=order.service.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.OrderService = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const order_repository_1 = require("../infrastructure/order.repository")
let OrderService = class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }
  async findAll(limit, offset) {
    return this.orderRepository.findAll(limit, offset)
  }
  async findById(id) {
    return this.orderRepository.findById(id)
  }
  async create(orderData) {
    return this.orderRepository.create(orderData)
  }
  async update(id, orderData) {
    return this.orderRepository.update(id, orderData)
  }
  async delete(id) {
    return this.orderRepository.delete(id)
  }
}
exports.OrderService = OrderService
exports.OrderService = OrderService = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [
      order_repository_1.OrderRepository,
    ]),
  ],
  OrderService,
)
