"use strict"
//# sourceMappingURL=product.service.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ProductService = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const product_repository_1 = require("../infrastructure/product.repository")
let ProductService = class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository
  }
  async findAll(limit, offset) {
    return this.productRepository.findAll(limit, offset)
  }
  async findById(id) {
    return this.productRepository.findById(id)
  }
  async create(productData) {
    return this.productRepository.create(productData)
  }
  async update(id, productData) {
    return this.productRepository.update(id, productData)
  }
  async delete(id) {
    return this.productRepository.delete(id)
  }
}
exports.ProductService = ProductService
exports.ProductService = ProductService = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [
      product_repository_1.ProductRepository,
    ]),
  ],
  ProductService,
)
