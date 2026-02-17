import createError from 'http-errors';
import { OrderRepository } from './order.repository';
import { CreateOrderInput, UpdateOrderInput } from './order.schema';
import { Database } from '../../db/index';

export class OrderService {
  private repository: OrderRepository;

  constructor(private db: Database) {
    this.repository = new OrderRepository(db);
  }

  async listOrders(
    limit: number,
    offset: number,
    filters?: { userId?: number; status?: string }
  ) {
    return await this.repository.findAll(limit, offset, filters);
  }

  async getOrderById(id: number) {
    const order = await this.repository.findById(id);
    if (!order) {
      throw createError(404, 'Order not found');
    }
    return order;
  }

  async createOrder(input: CreateOrderInput) {
    // Validate user exists
    const user = await this.repository.getUserById(input.userId);
    if (!user) {
      throw createError(400, 'User not found');
    }

    // Validate all products exist and calculate total
    let totalAmount = 0;
    const productDetails = [];

    for (const item of input.items) {
      const product = await this.repository.getProductById(item.productId);
      if (!product) {
        throw createError(400, `Product with ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw createError(
          400,
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }
      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;
      productDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    // Create order and order items in a transaction
    return await this.db.transaction(async (tx) => {
      // Create the order
      const newOrder = await tx
        .insert((await import('../../db/schema/index')).orders)
        .values({
          userId: input.userId,
          totalAmount: totalAmount.toFixed(2),
          status: input.status || 'pending',
        })
        .returning();

      // Create order items
      const orderItemsData = productDetails.map((detail) => ({
        orderId: newOrder[0].id,
        productId: detail.productId,
        quantity: detail.quantity,
        priceAtPurchase: detail.priceAtPurchase,
      }));

      await tx.insert((await import('../../db/schema/index')).orderItems).values(orderItemsData);

      // Update product stock
      const { products } = await import('../../db/schema/index');
      const { eq, sql } = await import('drizzle-orm');

      for (const item of input.items) {
        await tx
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
          })
          .where(eq(products.id, item.productId));
      }

      // Fetch and return the complete order
      const completeOrder = await this.repository.findById(newOrder[0].id);
      return completeOrder;
    });
  }

  async updateOrder(id: number, input: UpdateOrderInput) {
    const existingOrder = await this.repository.findById(id);
    if (!existingOrder) {
      throw createError(404, 'Order not found');
    }

    const updatedOrder = await this.repository.update(id, input);
    if (!updatedOrder) {
      throw createError(404, 'Order not found');
    }

    // Fetch complete order with items
    return await this.repository.findById(id);
  }

  async deleteOrder(id: number) {
    const deletedOrder = await this.repository.delete(id);
    if (!deletedOrder) {
      throw createError(404, 'Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
}
