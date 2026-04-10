import { Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { DatabaseService } from "../../../../core/src"
import { products, NewProduct } from "../../../../infrastructure/database/src"
import { Product } from "../domain/product.entity"
import { IProductRepository } from "../domain/product.repository.interface"

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(limit: number, offset: number): Promise<Product[]> {
    const result = await this.databaseService.db
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)

    return result.map(Product.fromDb)
  }

  async findById(id: number): Promise<Product | null> {
    const result = await this.databaseService.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    return result.length > 0 ? Product.fromDb(result[0]) : null
  }

  async create(productData: NewProduct): Promise<Product> {
    const result = await this.databaseService.db
      .insert(products)
      .values(productData)
      .returning()

    return Product.fromDb(result[0])
  }

  async update(
    id: number,
    productData: Partial<NewProduct>,
  ): Promise<Product | null> {
    const result = await this.databaseService.db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning()

    return result.length > 0 ? Product.fromDb(result[0]) : null
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id })

    return result.length > 0
  }
}
