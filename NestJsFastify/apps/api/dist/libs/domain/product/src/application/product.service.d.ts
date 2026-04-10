import { Product } from "../domain/product.entity"
import { IProductRepository } from "../domain/product.repository.interface"
import { NewProduct } from "../../../../infrastructure/database/src"
export declare class ProductService {
  private readonly productRepository
  constructor(productRepository: IProductRepository)
  findAll(limit: number, offset: number): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create(productData: NewProduct): Promise<Product>
  update(id: number, productData: Partial<NewProduct>): Promise<Product | null>
  delete(id: number): Promise<boolean>
}
