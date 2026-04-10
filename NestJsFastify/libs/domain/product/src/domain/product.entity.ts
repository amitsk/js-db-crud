import { Product as ProductType } from "../../../../infrastructure/database/src"

export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    public stock: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public description?: string,
  ) {}

  static fromDb(product: ProductType): Product {
    return new Product(
      product.id,
      product.name,
      Number(product.price),
      product.stock,
      product.createdAt,
      product.updatedAt,
      product.description || undefined,
    )
  }

  toDb() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price.toString(),
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
