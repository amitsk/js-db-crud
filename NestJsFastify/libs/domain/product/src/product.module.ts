import { Module } from "@nestjs/common"
import { ProductController } from "./presentation/product.controller"
import { ProductService } from "./application/product.service"
import { ProductRepository } from "./infrastructure/product.repository"

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
