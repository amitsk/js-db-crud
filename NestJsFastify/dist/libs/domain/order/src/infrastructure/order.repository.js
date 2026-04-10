import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { orders } from "../../../../infrastructure/database/src";
import { Order } from "../domain/order.entity";
let OrderRepository = class OrderRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll(limit, offset) {
        const result = await this.databaseService.db
            .select()
            .from(orders)
            .limit(limit)
            .offset(offset);
        return result.map(Order.fromDb);
    }
    async findById(id) {
        const result = await this.databaseService.db
            .select()
            .from(orders)
            .where(eq(orders.id, id))
            .limit(1);
        return result.length > 0 ? Order.fromDb(result[0]) : null;
    }
    async create(orderData) {
        const result = await this.databaseService.db
            .insert(orders)
            .values(orderData)
            .returning();
        return Order.fromDb(result[0]);
    }
    async update(id, orderData) {
        const result = await this.databaseService.db
            .update(orders)
            .set(orderData)
            .where(eq(orders.id, id))
            .returning();
        return result.length > 0 ? Order.fromDb(result[0]) : null;
    }
    async delete(id) {
        const result = await this.databaseService.db
            .delete(orders)
            .where(eq(orders.id, id))
            .returning({ id: orders.id });
        return result.length > 0;
    }
};
OrderRepository = __decorate([
    Injectable()
], OrderRepository);
export { OrderRepository };
//# sourceMappingURL=order.repository.js.map