"use strict"
//# sourceMappingURL=product.controller.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ProductController = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const product_service_1 = require("../application/product.service")
const product_dto_1 = require("./product.dto")
const src_1 = require("../../../../core/src")
let ProductController = class ProductController {
  constructor(productService) {
    this.productService = productService
  }
  async findAll(query) {
    const { limit, offset } = (0, src_1.getPaginationOptions)(query)
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
  async findById(id) {
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
  async create(createProductDto) {
    const product = await this.productService.create({
      name: createProductDto.name,
      price: createProductDto.price.toString(),
      stock: createProductDto.stock,
      description: createProductDto.description,
    })
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
  async update(id, updateProductDto) {
    const updateData = { ...updateProductDto }
    if (
      updateProductDto.price !==
      undefined
    ) {
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
  async delete(id) {
    const success = await this.productService.delete(parseInt(id))
    return { success }
  }
}
exports.ProductController = ProductController
tslib_1.__decorate(
  [
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  ProductController.prototype,
  "findAll",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Get)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  ProductController.prototype,
  "findById",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  ProductController.prototype,
  "create",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Put)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [
      String,
      product_dto_1.UpdateProductDto,
    ]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  ProductController.prototype,
  "update",
  null,
)
tslib_1.__decorate(
  [
    (0, common_1.Delete)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise),
  ],
  ProductController.prototype,
  "delete",
  null,
)
exports.ProductController = ProductController = tslib_1.__decorate(
  [
    (0, common_1.Controller)("api/products"),
    tslib_1.__metadata("design:paramtypes", [product_service_1.ProductService]),
  ],
  ProductController,
)
