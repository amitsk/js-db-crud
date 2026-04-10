import { Order } from "../domain/order.entity"
import { IOrderRepository } from "../domain/order.repository.interface"
import { NewOrder } from "../../../../infrastructure/database/src"
export declare class OrderService {
  private readonly orderRepository
  constructor(orderRepository: IOrderRepository)
  findAll(limit: number, offset: number): Promise<Order[]>
  findById(id: number): Promise<Order | null>
  create(orderData: NewOrder): Promise<Order>
  update(id: number, orderData: Partial<NewOrder>): Promise<Order | null>
  delete(id: number): Promise<boolean>
}
