import { ProductService } from "../application/product.service"
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
  ProductsListResponseDto,
} from "./product.dto"
export declare class ProductController {
  private readonly productService
  constructor(productService: ProductService)
  findAll(query: any): Promise<ProductsListResponseDto>
  findById(id: string): Promise<ProductResponseDto | null>
  create(createProductDto: CreateProductDto): Promise<ProductResponseDto>
  update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto | null>
  delete(id: string): Promise<{
    success: boolean
  }>
}
