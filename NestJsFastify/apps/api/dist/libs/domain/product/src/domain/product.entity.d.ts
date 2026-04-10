import { Product as ProductType } from "../../../../infrastructure/database/src"
export declare class Product {
  readonly id: number
  name: string
  price: number
  stock: number
  readonly createdAt: Date
  updatedAt: Date
  description?: string
  constructor(
    id: number,
    name: string,
    price: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
  )
  static fromDb(product: ProductType): Product
  toDb(): {
    id: number
    name: string
    description: string
    price: string
    stock: number
    createdAt: Date
    updatedAt: Date
  }
}
