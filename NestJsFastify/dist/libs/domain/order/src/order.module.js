import { __decorate } from "tslib";
import { Module } from "@nestjs/common";
import { OrderController } from "./presentation/order.controller";
import { OrderService } from "./application/order.service";
import { OrderRepository } from "./infrastructure/order.repository";
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    Module({
        controllers: [OrderController],
        providers: [OrderService, OrderRepository],
        exports: [OrderService, OrderRepository],
    })
], OrderModule);
export { OrderModule };
//# sourceMappingURL=order.module.js.map