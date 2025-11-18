import { eq, and } from 'drizzle-orm';
import { Database } from '../../db/index';
import { orders, orderItems, products, users, NewOrder, NewOrderItem } from '../../db/schema/index';

export class OrderRepository {
  constructor(private db: Database) {}

  async findAll(limit: number, offset: number, filters?: { userId?: number; status?: string }) {
    let query = this.db
      .select({
        order: orders,
        user: {
          id: users.id,
          email: users.email,
          name: users.name,
        },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .$dynamic();

    if (filters?.userId) {
      query = query.where(eq(orders.userId, filters.userId));
    }
    if (filters?.status) {
      query = query.where(eq(orders.status, filters.status));
    }

    return await query.limit(limit).offset(offset);
  }

  async findById(id: number) {
    const result = await this.db
      .select({
        order: orders,
        user: {
          id: users.id,
          email: users.email,
          name: users.name,
        },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, id))
      .limit(1);

    if (!result[0]) return null;

    // Fetch order items
    const items = await this.db
      .select({
        orderItem: orderItems,
        product: products,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    return {
      ...result[0],
      items,
    };
  }

  async create(orderData: NewOrder) {
    const result = await this.db.insert(orders).values(orderData).returning();
    return result[0];
  }

  async createOrderItems(items: NewOrderItem[]) {
    if (items.length === 0) return [];
    return await this.db.insert(orderItems).values(items).returning();
  }

  async update(id: number, data: Partial<NewOrder>) {
    const result = await this.db
      .update(orders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: number) {
    // Order items will be cascade deleted due to FK constraint
    const result = await this.db.delete(orders).where(eq(orders.id, id)).returning();
    return result[0] || null;
  }

  async getProductById(id: number) {
    const result = await this.db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0] || null;
  }

  async getUserById(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }
}
