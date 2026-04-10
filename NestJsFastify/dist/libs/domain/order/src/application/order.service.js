import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async findAll(limit, offset) {
        return this.orderRepository.findAll(limit, offset);
    }
    async findById(id) {
        return this.orderRepository.findById(id);
    }
    async create(orderData) {
        return this.orderRepository.create(orderData);
    }
    async update(id, orderData) {
        return this.orderRepository.update(id, orderData);
    }
    async delete(id) {
        return this.orderRepository.delete(id);
    }
};
OrderService = __decorate([
    Injectable()
], OrderService);
export { OrderService };
//# sourceMappingURL=order.service.js.map