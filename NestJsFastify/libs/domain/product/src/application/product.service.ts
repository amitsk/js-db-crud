import { Injectable } from "@nestjs/common"
import { Product } from "../domain/product.entity"
import { ProductRepository } from "../infrastructure/product.repository"
import { NewProduct } from "../../../../infrastructure/database/src"

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(limit: number, offset: number): Promise<Product[]> {
    return this.productRepository.findAll(limit, offset)
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id)
  }

  async create(productData: NewProduct): Promise<Product> {
    return this.productRepository.create(productData)
  }

  async update(
    id: number,
    productData: Partial<NewProduct>,
  ): Promise<Product | null> {
    return this.productRepository.update(id, productData)
  }

  async delete(id: number): Promise<boolean> {
    return this.productRepository.delete(id)
  }
}
