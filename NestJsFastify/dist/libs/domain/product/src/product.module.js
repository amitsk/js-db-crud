import { __decorate } from "tslib";
import { Module } from "@nestjs/common";
import { ProductController } from "./presentation/product.controller";
import { ProductService } from "./application/product.service";
import { ProductRepository } from "./infrastructure/product.repository";
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    Module({
        controllers: [ProductController],
        providers: [ProductService, ProductRepository],
        exports: [ProductService, ProductRepository],
    })
], ProductModule);
export { ProductModule };
//# sourceMappingURL=product.module.js.map