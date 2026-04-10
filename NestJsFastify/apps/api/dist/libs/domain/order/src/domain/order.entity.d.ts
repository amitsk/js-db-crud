import { Order as OrderType } from "../../../../infrastructure/database/src"
export declare class Order {
  readonly id: number
  userId: number
  totalAmount: number
  status: string
  readonly createdAt: Date
  updatedAt: Date
  constructor(
    id: number,
    userId: number,
    totalAmount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  )
  static fromDb(order: OrderType): Order
  toDb(): {
    id: number
    userId: number
    totalAmount: string
    status: string
    createdAt: Date
    updatedAt: Date
  }
}
