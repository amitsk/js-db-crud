import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll(limit, offset) {
        return this.productRepository.findAll(limit, offset);
    }
    async findById(id) {
        return this.productRepository.findById(id);
    }
    async create(productData) {
        return this.productRepository.create(productData);
    }
    async update(id, productData) {
        return this.productRepository.update(id, productData);
    }
    async delete(id) {
        return this.productRepository.delete(id);
    }
};
ProductService = __decorate([
    Injectable()
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map