import { OrderService } from "../application/order.service"
import {
  CreateOrderDto,
  UpdateOrderDto,
  OrderResponseDto,
  OrdersListResponseDto,
} from "./order.dto"
export declare class OrderController {
  private readonly orderService
  constructor(orderService: OrderService)
  findAll(query: any): Promise<OrdersListResponseDto>
  findById(id: string): Promise<OrderResponseDto | null>
  create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>
  update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto | null>
  delete(id: string): Promise<{
    success: boolean
  }>
}
