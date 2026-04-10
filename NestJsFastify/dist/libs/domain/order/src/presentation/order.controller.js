import { __decorate, __param } from "tslib";
import { Controller, Get, Post, Put, Delete, Body, Param, Query, } from "@nestjs/common";
import { getPaginationOptions } from "../../../../core/src";
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async findAll(query) {
        const { limit, offset } = getPaginationOptions(query);
        const orders = await this.orderService.findAll(limit, offset);
        return {
            data: orders.map((order) => ({
                id: order.id,
                userId: order.userId,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            })),
            total: orders.length,
            limit,
            offset,
        };
    }
    async findById(id) {
        const order = await this.orderService.findById(parseInt(id));
        if (!order)
            return null;
        return {
            id: order.id,
            userId: order.userId,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
    async create(createOrderDto) {
        const order = await this.orderService.create({
            userId: createOrderDto.userId,
            totalAmount: createOrderDto.totalAmount.toString(),
        });
        return {
            id: order.id,
            userId: order.userId,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
    async update(id, updateOrderDto) {
        const updateData = { ...updateOrderDto };
        if (updateOrderDto.totalAmount !== undefined) {
            updateData.totalAmount = updateOrderDto.totalAmount.toString();
        }
        const order = await this.orderService.update(parseInt(id), updateData);
        if (!order)
            return null;
        return {
            id: order.id,
            userId: order.userId,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
    async delete(id) {
        const success = await this.orderService.delete(parseInt(id));
        return { success };
    }
};
__decorate([
    Get(),
    __param(0, Query())
], OrderController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id"))
], OrderController.prototype, "findById", null);
__decorate([
    Post(),
    __param(0, Body())
], OrderController.prototype, "create", null);
__decorate([
    Put(":id"),
    __param(0, Param("id")),
    __param(1, Body())
], OrderController.prototype, "update", null);
__decorate([
    Delete(":id"),
    __param(0, Param("id"))
], OrderController.prototype, "delete", null);
OrderController = __decorate([
    Controller("api/orders")
], OrderController);
export { OrderController };
//# sourceMappingURL=order.controller.js.map