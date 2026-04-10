import { DatabaseService } from "../../../../core/src"
import { NewOrder } from "../../../../infrastructure/database/src"
import { Order } from "../domain/order.entity"
import { IOrderRepository } from "../domain/order.repository.interface"
export declare class OrderRepository implements IOrderRepository {
  private readonly databaseService
  constructor(databaseService: DatabaseService)
  findAll(limit: number, offset: number): Promise<Order[]>
  findById(id: number): Promise<Order | null>
  create(orderData: NewOrder): Promise<Order>
  update(id: number, orderData: Partial<NewOrder>): Promise<Order | null>
  delete(id: number): Promise<boolean>
}
