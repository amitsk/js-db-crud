import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { products } from "../../../../infrastructure/database/src";
import { Product } from "../domain/product.entity";
let ProductRepository = class ProductRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll(limit, offset) {
        const result = await this.databaseService.db
            .select()
            .from(products)
            .limit(limit)
            .offset(offset);
        return result.map(Product.fromDb);
    }
    async findById(id) {
        const result = await this.databaseService.db
            .select()
            .from(products)
            .where(eq(products.id, id))
            .limit(1);
        return result.length > 0 ? Product.fromDb(result[0]) : null;
    }
    async create(productData) {
        const result = await this.databaseService.db
            .insert(products)
            .values(productData)
            .returning();
        return Product.fromDb(result[0]);
    }
    async update(id, productData) {
        const result = await this.databaseService.db
            .update(products)
            .set(productData)
            .where(eq(products.id, id))
            .returning();
        return result.length > 0 ? Product.fromDb(result[0]) : null;
    }
    async delete(id) {
        const result = await this.databaseService.db
            .delete(products)
            .where(eq(products.id, id))
            .returning({ id: products.id });
        return result.length > 0;
    }
};
ProductRepository = __decorate([
    Injectable()
], ProductRepository);
export { ProductRepository };
//# sourceMappingURL=product.repository.js.map