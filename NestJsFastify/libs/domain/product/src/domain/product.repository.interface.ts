import { Product } from "./product.entity"
import { NewProduct } from "../../../../infrastructure/database/src"

export interface IProductRepository {
  findAll(limit: number, offset: number): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create(product: NewProduct): Promise<Product>
  update(id: number, product: Partial<NewProduct>): Promise<Product | null>
  delete(id: number): Promise<boolean>
}
