import createError from 'http-errors';
import { ProductRepository } from './product.repository';
import { CreateProductInput, UpdateProductInput } from './product.schema';
import { Database } from '../../db/index';

export class ProductService {
  private repository: ProductRepository;

  constructor(db: Database) {
    this.repository = new ProductRepository(db);
  }

  async listProducts(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getProductById(id: number) {
    const product = await this.repository.findById(id);
    if (!product) {
      throw createError(404, 'Product not found');
    }
    return product;
  }

  async createProduct(input: CreateProductInput) {
    const newProduct = await this.repository.create({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
    });
    return newProduct;
  }

  async updateProduct(id: number, input: UpdateProductInput) {
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw createError(404, 'Product not found');
    }

    const updatedProduct = await this.repository.update(id, input);
    if (!updatedProduct) {
      throw createError(404, 'Product not found');
    }
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const deletedProduct = await this.repository.delete(id);
    if (!deletedProduct) {
      throw createError(404, 'Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
