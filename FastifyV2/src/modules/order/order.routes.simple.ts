import { FastifyInstance } from 'fastify';
import { eq, sql } from 'drizzle-orm';
import createError from 'http-errors';
import { orders, orderItems, products, users } from '../../db/schema';
import {
  createOrderSchema,
  updateOrderSchema,
  orderIdParamSchema,
  listOrdersQuerySchema,
} from './order.schema';

export async function orderRoutes(fastify: FastifyInstance) {
  // GET /api/orders - List all orders
  fastify.get('/', {
    schema: { querystring: listOrdersQuerySchema },
  }, async (request) => {
    const { limit, offset, userId, status } = request.query as any;

    let query = fastify.db
      .select({
        order: orders,
        user: { id: users.id, email: users.email, name: users.name },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .$dynamic();

    if (userId) query = query.where(eq(orders.userId, userId));
    if (status) query = query.where(eq(orders.status, status));

    return await query.limit(limit).offset(offset);
  });

  // GET /api/orders/:id - Get order with items
  fastify.get('/:id', {
    schema: { params: orderIdParamSchema },
  }, async (request) => {
    const { id } = request.params as any;

    // Get order with user
    const [orderData] = await fastify.db
      .select({
        order: orders,
        user: { id: users.id, email: users.email, name: users.name },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, id))
      .limit(1);

    if (!orderData) throw createError(404, 'Order not found');

    // Get order items with products
    const items = await fastify.db
      .select({
        orderItem: orderItems,
        product: products,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    return { ...orderData, items };
  });

  // POST /api/orders - Create order with items (transaction)
  fastify.post('/', {
    schema: { body: createOrderSchema },
  }, async (request, reply) => {
    const body = request.body as any;

    // Validate user exists
    const [user] = await fastify.db.select().from(users).where(eq(users.id, body.userId)).limit(1);
    if (!user) throw createError(400, 'User not found');

    // Validate products and calculate total
    let totalAmount = 0;
    const productDetails = [];

    for (const item of body.items) {
      const [product] = await fastify.db.select().from(products).where(eq(products.id, item.productId)).limit(1);
      if (!product) throw createError(400, `Product ${item.productId} not found`);
      if (product.stock < item.quantity) {
        throw createError(400, `Insufficient stock for ${product.name}`);
      }

      totalAmount += parseFloat(product.price) * item.quantity;
      productDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    // Create order and items in transaction
    const result = await fastify.db.transaction(async (tx) => {
      // Create order
      const [newOrder] = await tx.insert(orders).values({
        userId: body.userId,
        totalAmount: totalAmount.toFixed(2),
        status: body.status || 'pending',
      }).returning();

      // Create order items
      const orderItemsData = productDetails.map((detail) => ({
        orderId: newOrder.id,
        productId: detail.productId,
        quantity: detail.quantity,
        priceAtPurchase: detail.priceAtPurchase,
      }));
      await tx.insert(orderItems).values(orderItemsData);

      // Update product stock
      for (const item of body.items) {
        await tx.update(products)
          .set({ stock: sql`${products.stock} - ${item.quantity}` })
          .where(eq(products.id, item.productId));
      }

      return newOrder;
    });

    // Fetch complete order with items
    const [orderData] = await fastify.db
      .select({
        order: orders,
        user: { id: users.id, email: users.email, name: users.name },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, result.id))
      .limit(1);

    const items = await fastify.db
      .select({ orderItem: orderItems, product: products })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, result.id));

    return reply.status(201).send({ ...orderData, items });
  });

  // PUT /api/orders/:id - Update order status
  fastify.put('/:id', {
    schema: {
      params: orderIdParamSchema,
      body: updateOrderSchema,
    },
  }, async (request) => {
    const { id } = request.params as any;
    const body = request.body as any;

    const [updated] = await fastify.db
      .update(orders)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    if (!updated) throw createError(404, 'Order not found');

    // Fetch complete order
    const [orderData] = await fastify.db
      .select({
        order: orders,
        user: { id: users.id, email: users.email, name: users.name },
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, id))
      .limit(1);

    const items = await fastify.db
      .select({ orderItem: orderItems, product: products })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    return { ...orderData, items };
  });

  // DELETE /api/orders/:id - Delete order
  fastify.delete('/:id', {
    schema: { params: orderIdParamSchema },
  }, async (request, reply) => {
    const { id } = request.params as any;

    const [deleted] = await fastify.db.delete(orders).where(eq(orders.id, id)).returning();
    if (!deleted) throw createError(404, 'Order not found');

    return reply.send({ message: 'Order deleted successfully' });
  });
}
