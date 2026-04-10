import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common"
import { ProductService } from "../application/product.service"
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
  ProductsListResponseDto,
} from "./product.dto"
import { getPaginationOptions } from "../../../../core/src"

@Controller("api/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query: any): Promise<ProductsListResponseDto> {
    const { limit, offset } = getPaginationOptions(query)
    const products = await this.productService.findAll(limit, offset)

    return {
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
      total: products.length,
      limit,
      offset,
    }
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<ProductResponseDto | null> {
    const product = await this.productService.findById(parseInt(id))
    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.create({
      name: createProductDto.name,
      price: createProductDto.price.toString(),
      stock: createProductDto.stock,
      description: createProductDto.description,
    } as any)
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto | null> {
    const updateData: any = { ...updateProductDto }
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price.toString()
    }

    const product = await this.productService.update(parseInt(id), updateData)
    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const success = await this.productService.delete(parseInt(id))
    return { success }
  }
}
