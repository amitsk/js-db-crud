import { Order } from "./order.entity"
import { NewOrder } from "../../../../infrastructure/database/src"
export interface IOrderRepository {
  findAll(limit: number, offset: number): Promise<Order[]>
  findById(id: number): Promise<Order | null>
  create(order: NewOrder): Promise<Order>
  update(id: number, order: Partial<NewOrder>): Promise<Order | null>
  delete(id: number): Promise<boolean>
}
