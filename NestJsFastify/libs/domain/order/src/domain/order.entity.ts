import { Order as OrderType } from "../../../../infrastructure/database/src"

export class Order {
  constructor(
    public readonly id: number,
    public userId: number,
    public totalAmount: number,
    public status: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromDb(order: OrderType): Order {
    return new Order(
      order.id,
      order.userId,
      Number(order.totalAmount),
      order.status,
      order.createdAt,
      order.updatedAt,
    )
  }

  toDb() {
    return {
      id: this.id,
      userId: this.userId,
      totalAmount: this.totalAmount.toString(),
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
