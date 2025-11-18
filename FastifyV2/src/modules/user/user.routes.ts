import { FastifyInstance } from 'fastify';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  listUsersQuerySchema,
} from './user.schema';

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.db);
  const userController = new UserController(userService);

  // GET /api/users - List all users with pagination
  fastify.get(
    '/',
    {
      schema: {
        querystring: listUsersQuerySchema,
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                name: { type: 'string' },
                role: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
              },
            },
          },
        },
      },
    },
    userController.listUsers.bind(userController)
  );

  // GET /api/users/:id - Get user by ID
  fastify.get(
    '/:id',
    {
      schema: {
        params: userIdParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              name: { type: 'string' },
              role: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    userController.getUser.bind(userController)
  );

  // POST /api/users - Create new user
  fastify.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              name: { type: 'string' },
              role: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    userController.createUser.bind(userController)
  );

  // PUT /api/users/:id - Update user
  fastify.put(
    '/:id',
    {
      schema: {
        params: userIdParamSchema,
        body: updateUserSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              name: { type: 'string' },
              role: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    userController.updateUser.bind(userController)
  );

  // DELETE /api/users/:id - Delete user
  fastify.delete(
    '/:id',
    {
      schema: {
        params: userIdParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    userController.deleteUser.bind(userController)
  );
}
