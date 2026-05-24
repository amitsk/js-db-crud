import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import createError from "http-errors";
import { z } from "zod";
import { users } from "../../db/schema";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  listUsersQuerySchema,
} from "./user.schema";

type UserIdParams = z.infer<typeof userIdParamSchema>;
type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
type CreateUserBody = z.infer<typeof createUserSchema>;
type UpdateUserBody = z.infer<typeof updateUserSchema>;

export async function userRoutes(fastify: FastifyInstance) {
  // GET /api/users - List all users with pagination
  fastify.get<{ Querystring: ListUsersQuery }>(
    "/",
    {
      schema: { querystring: listUsersQuerySchema },
    },
    async (request) => {
      const { limit, offset } = request.query;
      const allUsers = await fastify.db.select().from(users).limit(limit).offset(offset);

      // Remove password hashes from response
      return allUsers.map(({ passwordHash: _passwordHash, ...user }) => user);
    },
  );

  // GET /api/users/:id - Get user by ID
  fastify.get<{ Params: UserIdParams }>(
    "/:id",
    {
      schema: { params: userIdParamSchema },
    },
    async (request) => {
      const { id } = request.params;

      const [user] = await fastify.db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!user) throw createError(404, "User not found");

      const { passwordHash: _passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    },
  );

  // POST /api/users - Create new user
  fastify.post<{ Body: CreateUserBody }>(
    "/",
    {
      schema: { body: createUserSchema },
    },
    async (request, reply) => {
      const body = request.body;

      // Check if email exists
      const [existing] = await fastify.db
        .select()
        .from(users)
        .where(eq(users.email, body.email))
        .limit(1);
      if (existing) throw createError(400, "Email already exists");

      // Hash password (stub - use bcrypt in production)
      const passwordHash = `hashed_${body.password}`;

      const [newUser] = await fastify.db
        .insert(users)
        .values({
          email: body.email,
          passwordHash,
          name: body.name,
          role: body.role || "customer",
        })
        .returning();

      const { passwordHash: _passwordHash, ...userWithoutPassword } = newUser;
      return reply.status(201).send(userWithoutPassword);
    },
  );

  // PUT /api/users/:id - Update user
  fastify.put<{ Params: UserIdParams; Body: UpdateUserBody }>(
    "/:id",
    {
      schema: {
        params: userIdParamSchema,
        body: updateUserSchema,
      },
    },
    async (request) => {
      const { id } = request.params;
      const body = request.body;

      // Check user exists
      const [existing] = await fastify.db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!existing) throw createError(404, "User not found");

      // Check email conflict if updating email
      if (body.email && body.email !== existing.email) {
        const [emailExists] = await fastify.db
          .select()
          .from(users)
          .where(eq(users.email, body.email))
          .limit(1);
        if (emailExists) throw createError(400, "Email already exists");
      }

      const [updated] = await fastify.db
        .update(users)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();

      const { passwordHash: _passwordHash, ...userWithoutPassword } = updated;
      return userWithoutPassword;
    },
  );

  // DELETE /api/users/:id - Delete user
  fastify.delete<{ Params: UserIdParams }>(
    "/:id",
    {
      schema: { params: userIdParamSchema },
    },
    async (request, reply) => {
      const { id } = request.params;

      const [deleted] = await fastify.db.delete(users).where(eq(users.id, id)).returning();
      if (!deleted) throw createError(404, "User not found");

      return reply.send({ message: "User deleted successfully" });
    },
  );
}
