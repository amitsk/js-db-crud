import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { orders, products, users } from "../db/schema.js";

const createOrderSchema = z.object({
	userId: z.number().int().positive(),
	productId: z.number().int().positive(),
	quantity: z.number().int().positive(),
});

const updateOrderSchema = z.object({
	userId: z.number().int().positive().optional(),
	productId: z.number().int().positive().optional(),
	quantity: z.number().int().positive().optional(),
});

export default async function ordersRoutes(fastify, _options) {
	// GET /orders
	fastify.get("/orders", async (_request, _reply) => {
		const allOrders = await db
			.select({
				id: orders.id,
				userId: orders.userId,
				productId: orders.productId,
				quantity: orders.quantity,
				createdAt: orders.createdAt,
				user: {
					id: users.id,
					name: users.name,
					email: users.email,
				},
				product: {
					id: products.id,
					name: products.name,
					price: products.price,
					description: products.description,
				},
			})
			.from(orders)
			.leftJoin(users, eq(orders.userId, users.id))
			.leftJoin(products, eq(orders.productId, products.id));
		return allOrders;
	});

	// GET /orders/:id
	fastify.get("/orders/:id", async (request, reply) => {
		const { id } = request.params;
		const orderId = parseInt(id, 10);
		if (Number.isNaN(orderId)) {
			return reply.code(400).send({ error: "Invalid order ID" });
		}
		const order = await db
			.select({
				id: orders.id,
				userId: orders.userId,
				productId: orders.productId,
				quantity: orders.quantity,
				createdAt: orders.createdAt,
				user: {
					id: users.id,
					name: users.name,
					email: users.email,
				},
				product: {
					id: products.id,
					name: products.name,
					price: products.price,
					description: products.description,
				},
			})
			.from(orders)
			.where(eq(orders.id, orderId))
			.leftJoin(users, eq(orders.userId, users.id))
			.leftJoin(products, eq(orders.productId, products.id))
			.limit(1);
		if (order.length === 0) {
			return reply.code(404).send({ error: "Order not found" });
		}
		return order[0];
	});

	// POST /orders
	fastify.post("/orders", async (request, reply) => {
		try {
			const { userId, productId, quantity } = createOrderSchema.parse(request.body);
			// Check if user exists
			const userExists = await db
				.select()
				.from(users)
				.where(eq(users.id, userId))
				.limit(1);
			if (userExists.length === 0) {
				return reply.code(400).send({ error: "User not found" });
			}
			// Check if product exists
			const productExists = await db
				.select()
				.from(products)
				.where(eq(products.id, productId))
				.limit(1);
			if (productExists.length === 0) {
				return reply.code(400).send({ error: "Product not found" });
			}
			const newOrder = await db
				.insert(orders)
				.values({ userId, productId, quantity })
				.returning();
			return reply.code(201).send(newOrder[0]);
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// PUT /orders/:id
	fastify.put("/orders/:id", async (request, reply) => {
		const { id } = request.params;
		const orderId = parseInt(id, 10);
		if (Number.isNaN(orderId)) {
			return reply.code(400).send({ error: "Invalid order ID" });
		}
		try {
			const { userId, productId, quantity } = updateOrderSchema.parse(request.body);
			if (userId) {
				const userExists = await db
					.select()
					.from(users)
					.where(eq(users.id, userId))
					.limit(1);
				if (userExists.length === 0) {
					return reply.code(400).send({ error: "User not found" });
				}
			}
			if (productId) {
				const productExists = await db
					.select()
					.from(products)
					.where(eq(products.id, productId))
					.limit(1);
				if (productExists.length === 0) {
					return reply.code(400).send({ error: "Product not found" });
				}
			}
			const updatedOrder = await db
				.update(orders)
				.set({ userId, productId, quantity })
				.where(eq(orders.id, orderId))
				.returning();
			if (updatedOrder.length === 0) {
				return reply.code(404).send({ error: "Order not found" });
			}
			return updatedOrder[0];
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// DELETE /orders/:id
	fastify.delete("/orders/:id", async (request, reply) => {
		const { id } = request.params;
		const orderId = parseInt(id, 10);
		if (Number.isNaN(orderId)) {
			return reply.code(400).send({ error: "Invalid order ID" });
		}
		const deletedOrder = await db
			.delete(orders)
			.where(eq(orders.id, orderId))
			.returning();
		if (deletedOrder.length === 0) {
			return reply.code(404).send({ error: "Order not found" });
		}
		return reply.code(204).send();
	});
}
