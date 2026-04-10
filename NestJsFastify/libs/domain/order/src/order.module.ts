import { Module } from "@nestjs/common"
import { OrderController } from "./presentation/order.controller"
import { OrderService } from "./application/order.service"
import { OrderRepository } from "./infrastructure/order.repository"

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
