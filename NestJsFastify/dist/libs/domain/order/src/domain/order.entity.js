export class Order {
    constructor(id, userId, totalAmount, status, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromDb(order) {
        return new Order(order.id, order.userId, Number(order.totalAmount), order.status, order.createdAt, order.updatedAt);
    }
    toDb() {
        return {
            id: this.id,
            userId: this.userId,
            totalAmount: this.totalAmount.toString(),
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=order.entity.js.map