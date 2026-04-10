import { Injectable } from "@nestjs/common"
import { Order } from "../domain/order.entity"
import { OrderRepository } from "../infrastructure/order.repository"
import { NewOrder } from "../../../../infrastructure/database/src"

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(limit: number, offset: number): Promise<Order[]> {
    return this.orderRepository.findAll(limit, offset)
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id)
  }

  async create(orderData: NewOrder): Promise<Order> {
    return this.orderRepository.create(orderData)
  }

  async update(
    id: number,
    orderData: Partial<NewOrder>,
  ): Promise<Order | null> {
    return this.orderRepository.update(id, orderData)
  }

  async delete(id: number): Promise<boolean> {
    return this.orderRepository.delete(id)
  }
}
