"use strict"
//# sourceMappingURL=product.repository.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ProductRepository = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const drizzle_orm_1 = require("drizzle-orm")
const src_1 = require("../../../../core/src")
const src_2 = require("../../../../infrastructure/database/src")
const product_entity_1 = require("../domain/product.entity")
let ProductRepository = class ProductRepository {
  constructor(databaseService) {
    this.databaseService = databaseService
  }
  async findAll(limit, offset) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.products)
      .limit(limit)
      .offset(offset)
    return result.map(product_entity_1.Product.fromDb)
  }
  async findById(id) {
    const result = await this.databaseService.db
      .select()
      .from(src_2.products)
      .where((0, drizzle_orm_1.eq)(src_2.products.id, id))
      .limit(1)
    return result.length >
      0
      ? product_entity_1.Product.fromDb(result[0])
      : null
  }
  async create(productData) {
    const result = await this.databaseService.db
      .insert(src_2.products)
      .values(productData)
      .returning()
    return product_entity_1.Product.fromDb(result[0])
  }
  async update(id, productData) {
    const result = await this.databaseService.db
      .update(src_2.products)
      .set(productData)
      .where((0, drizzle_orm_1.eq)(src_2.products.id, id))
      .returning()
    return result.length >
      0
      ? product_entity_1.Product.fromDb(result[0])
      : null
  }
  async delete(id) {
    const result = await this.databaseService.db
      .delete(src_2.products)
      .where((0, drizzle_orm_1.eq)(src_2.products.id, id))
      .returning({ id: src_2.products.id })
    return (
      result.length >
      0
    )
  }
}
exports.ProductRepository = ProductRepository
exports.ProductRepository = ProductRepository = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [src_1.DatabaseService]),
  ],
  ProductRepository,
)
