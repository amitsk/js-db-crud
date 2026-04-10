export class Product {
    constructor(id, name, price, stock, createdAt, updatedAt, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
    }
    static fromDb(product) {
        return new Product(product.id, product.name, Number(product.price), product.stock, product.createdAt, product.updatedAt, product.description || undefined);
    }
    toDb() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price.toString(),
            stock: this.stock,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=product.entity.js.map