import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

const createUserSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
});

const updateUserSchema = z.object({
	name: z.string().min(1).optional(),
	email: z.string().email().optional(),
});

export default async function usersRoutes(fastify, _options) {
	// GET /users
	fastify.get("/users", async (_request, _reply) => {
		const allUsers = await db.select().from(users);
		return allUsers;
	});

	// GET /users/:id
	fastify.get("/users/:id", async (request, reply) => {
		const { id } = request.params;
		const userId = parseInt(id, 10);
		if (Number.isNaN(userId)) {
			return reply.code(400).send({ error: "Invalid user ID" });
		}
		const user = await db
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);
		if (user.length === 0) {
			return reply.code(404).send({ error: "User not found" });
		}
		return user[0];
	});

	// POST /users
	fastify.post("/users", async (request, reply) => {
		try {
			const { name, email } = createUserSchema.parse(request.body);
			const newUser = await db
				.insert(users)
				.values({ name, email })
				.returning();
			return reply.code(201).send(newUser[0]);
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// PUT /users/:id
	fastify.put("/users/:id", async (request, reply) => {
		const { id } = request.params;
		const userId = parseInt(id, 10);
		if (Number.isNaN(userId)) {
			return reply.code(400).send({ error: "Invalid user ID" });
		}
		try {
			const { name, email } = updateUserSchema.parse(request.body);
			const updatedUser = await db
				.update(users)
				.set({ name, email })
				.where(eq(users.id, userId))
				.returning();
			if (updatedUser.length === 0) {
				return reply.code(404).send({ error: "User not found" });
			}
			return updatedUser[0];
		} catch (error) {
			return reply.code(400).send({ error: error.message });
		}
	});

	// DELETE /users/:id
	fastify.delete("/users/:id", async (request, reply) => {
		const { id } = request.params;
		const userId = parseInt(id, 10);
		if (Number.isNaN(userId)) {
			return reply.code(400).send({ error: "Invalid user ID" });
		}
		const deletedUser = await db
			.delete(users)
			.where(eq(users.id, userId))
			.returning();
		if (deletedUser.length === 0) {
			return reply.code(404).send({ error: "User not found" });
		}
		return reply.code(204).send();
	});
}
