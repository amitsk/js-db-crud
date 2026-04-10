import { __decorate, __param } from "tslib";
import { Controller, Get, Post, Put, Delete, Body, Param, Query, } from "@nestjs/common";
import { getPaginationOptions } from "../../../../core/src";
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async findAll(query) {
        const { limit, offset } = getPaginationOptions(query);
        const products = await this.productService.findAll(limit, offset);
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
        };
    }
    async findById(id) {
        const product = await this.productService.findById(parseInt(id));
        if (!product)
            return null;
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    async create(createProductDto) {
        const product = await this.productService.create({
            name: createProductDto.name,
            price: createProductDto.price.toString(),
            stock: createProductDto.stock,
            description: createProductDto.description,
        });
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    async update(id, updateProductDto) {
        const updateData = { ...updateProductDto };
        if (updateProductDto.price !== undefined) {
            updateData.price = updateProductDto.price.toString();
        }
        const product = await this.productService.update(parseInt(id), updateData);
        if (!product)
            return null;
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    async delete(id) {
        const success = await this.productService.delete(parseInt(id));
        return { success };
    }
};
__decorate([
    Get(),
    __param(0, Query())
], ProductController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id"))
], ProductController.prototype, "findById", null);
__decorate([
    Post(),
    __param(0, Body())
], ProductController.prototype, "create", null);
__decorate([
    Put(":id"),
    __param(0, Param("id")),
    __param(1, Body())
], ProductController.prototype, "update", null);
__decorate([
    Delete(":id"),
    __param(0, Param("id"))
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    Controller("api/products")
], ProductController);
export { ProductController };
//# sourceMappingURL=product.controller.js.map