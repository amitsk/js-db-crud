import { Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { DatabaseService } from "../../../../core/src"
import { orders, NewOrder } from "../../../../infrastructure/database/src"
import { Order } from "../domain/order.entity"
import { IOrderRepository } from "../domain/order.repository.interface"

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(limit: number, offset: number): Promise<Order[]> {
    const result = await this.databaseService.db
      .select()
      .from(orders)
      .limit(limit)
      .offset(offset)

    return result.map(Order.fromDb)
  }

  async findById(id: number): Promise<Order | null> {
    const result = await this.databaseService.db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    return result.length > 0 ? Order.fromDb(result[0]) : null
  }

  async create(orderData: NewOrder): Promise<Order> {
    const result = await this.databaseService.db
      .insert(orders)
      .values(orderData)
      .returning()

    return Order.fromDb(result[0])
  }

  async update(
    id: number,
    orderData: Partial<NewOrder>,
  ): Promise<Order | null> {
    const result = await this.databaseService.db
      .update(orders)
      .set(orderData)
      .where(eq(orders.id, id))
      .returning()

    return result.length > 0 ? Order.fromDb(result[0]) : null
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning({ id: orders.id })

    return result.length > 0
  }
}
