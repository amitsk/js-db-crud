import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";

const createProductSchema = z.object({
	name: z.string().min(1),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/), // for numeric as string
	description: z.string().optional(),
});

const updateProductSchema = z.object({
	name: z.string().min(1).optional(),
	price: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/)
		.optional(),
	description: z.string().optional(),
});

export default async function productsRoutes(fastify, _options) {
	// GET /products
	fastify.get("/products", async (_request, _reply) => {
		const allProducts = await db.select().from(products);
		return allProducts;
	});

	// GET /products/:id
	fastify.get("/products/:id", async (request, reply) => {
		const { id } = request.params;
		const productId = parseInt(id, 10);
		if (Number.isNaN(productId)) {
			return reply.code(400).send({ error: "Invalid product ID" });
		}
		const product = await db
			.select()
			.from(products)
			.where(eq(products.id, productId))
			.limit(1);
		if (product.length === 0) {
			return reply.code(404).send({ error: "Product not found" });
		}
		return product[0];
	});

	// POST /products
	fastify.post("/products", async (request, reply) => {
		try {
			const { name, price, description } = createProductSchema.parse(request.body);
			const newProduct = await db
				.insert(products)
				.values({ name, price, description })
				.returning();
			return reply.code(201).send(newProduct[0]);
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// PUT /products/:id
	fastify.put("/products/:id", async (request, reply) => {
		const { id } = request.params;
		const productId = parseInt(id, 10);
		if (Number.isNaN(productId)) {
			return reply.code(400).send({ error: "Invalid product ID" });
		}
		try {
			const { name, price, description } = updateProductSchema.parse(request.body);
			const updatedProduct = await db
				.update(products)
				.set({ name, price, description })
				.where(eq(products.id, productId))
				.returning();
			if (updatedProduct.length === 0) {
				return reply.code(404).send({ error: "Product not found" });
			}
			return updatedProduct[0];
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// DELETE /products/:id
	fastify.delete("/products/:id", async (request, reply) => {
		const { id } = request.params;
		const productId = parseInt(id, 10);
		if (Number.isNaN(productId)) {
			return reply.code(400).send({ error: "Invalid product ID" });
		}
		const deletedProduct = await db
			.delete(products)
			.where(eq(products.id, productId))
			.returning();
		if (deletedProduct.length === 0) {
			return reply.code(404).send({ error: "Product not found" });
		}
		return reply.code(204).send();
	});
}
