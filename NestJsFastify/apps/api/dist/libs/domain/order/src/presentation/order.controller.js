"use strict"
//# sourceMappingURL=order.controller.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.OrderController = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const order_service_1 = require("../application/order.service")
const order_dto_1 = require("./order.dto")
const src_1 = require("../../../../core/src")
let OrderController = class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }
  async findAll(query) {
    const { limit, offset } = (0, src_1.getPaginationOptions)(query)
    const orders = await this.orderService.findAll(limit, offset)
    return {
      data: orders.map((order) => ({
        id: order.id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
      total: orders.length,
      limit,
      offset,
    }
  }
  async findById(id) {
    const order = await this.orderService.findById(parseInt(id))
    if (!order) return null
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
  async create(createOrderDto) {
    const order = await this.orderService.create({
      userId: createOrderDto.userId,
      totalAmount: createOrderDto.totalAmount.toString(),
    })
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
  async update(id, updateOrderDto) {
    const updateData = { ...updateOrderDto }
    if (
      updateOrderDto.totalAmount !==
      undefined
    ) {
      updateData.totalAmount = updateOrderDto.totalAmount.toString()
    }
    const order = await this.orderService.update(parseInt(id), updateData)
    if (!order) return null
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
  async delete(id) {
    const success = await this.orderService.delete(parseInt(id))
    return { success }
  }
}
exports.OrderController = OrderController
tslib_1.__decorate(
  [
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  OrderController.prototype,
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
  OrderController.prototype,
  "findById",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  OrderController.prototype,
  "create",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Put)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [
      String,
      order_dto_1.UpdateOrderDto,
    ]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  OrderController.prototype,
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
  OrderController.prototype,
  "delete",
  null,
)
exports.OrderController = OrderController = tslib_1.__decorate(
  [
    (0, common_1.Controller)("api/orders"),
    tslib_1.__metadata("design:paramtypes", [order_service_1.OrderService]),
  ],
  OrderController,
)
