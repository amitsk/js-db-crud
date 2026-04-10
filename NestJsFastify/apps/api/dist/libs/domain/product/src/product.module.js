"use strict"
//# sourceMappingURL=product.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ProductModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const product_controller_1 = require("./presentation/product.controller")
const product_service_1 = require("./application/product.service")
const product_repository_1 = require("./infrastructure/product.repository")
let ProductModule = class ProductModule {}
exports.ProductModule = ProductModule
exports.ProductModule = ProductModule = tslib_1.__decorate(
  [
    (0, common_1.Module)({
      controllers: [product_controller_1.ProductController],
      providers: [
        product_service_1.ProductService,
        product_repository_1.ProductRepository,
      ],
      exports: [
        product_service_1.ProductService,
        product_repository_1.ProductRepository,
      ],
    }),
  ],
  ProductModule,
)
