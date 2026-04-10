"use strict"
//# sourceMappingURL=order.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.OrderModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const order_controller_1 = require("./presentation/order.controller")
const order_service_1 = require("./application/order.service")
const order_repository_1 = require("./infrastructure/order.repository")
let OrderModule = class OrderModule {}
exports.OrderModule = OrderModule
exports.OrderModule = OrderModule = tslib_1.__decorate(
  [
    (0, common_1.Module)({
      controllers: [order_controller_1.OrderController],
      providers: [
        order_service_1.OrderService,
        order_repository_1.OrderRepository,
      ],
      exports: [
        order_service_1.OrderService,
        order_repository_1.OrderRepository,
      ],
    }),
  ],
  OrderModule,
)
