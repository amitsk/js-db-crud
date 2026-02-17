import { FastifyInstance } from 'fastify';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  createOrderSchema,
  updateOrderSchema,
  orderIdParamSchema,
  listOrdersQuerySchema,
} from './order.schema';

export async function orderRoutes(fastify: FastifyInstance) {
  const orderService = new OrderService(fastify.db);
  const orderController = new OrderController(orderService);

  // GET /api/orders - List all orders with pagination and filters
  fastify.get(
    '/',
    {
      schema: {
        querystring: listOrdersQuerySchema,
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                order: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    userId: { type: 'number' },
                    totalAmount: { type: 'string' },
                    status: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                  },
                },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    email: { type: 'string' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderController.listOrders.bind(orderController)
  );

  // GET /api/orders/:id - Get order by ID with items
  fastify.get(
    '/:id',
    {
      schema: {
        params: orderIdParamSchema,
      },
    },
    orderController.getOrder.bind(orderController)
  );

  // POST /api/orders - Create new order with items (transaction)
  fastify.post(
    '/',
    {
      schema: {
        body: createOrderSchema,
      },
    },
    orderController.createOrder.bind(orderController)
  );

  // PUT /api/orders/:id - Update order status
  fastify.put(
    '/:id',
    {
      schema: {
        params: orderIdParamSchema,
        body: updateOrderSchema,
      },
    },
    orderController.updateOrder.bind(orderController)
  );

  // DELETE /api/orders/:id - Delete order (cascade deletes items)
  fastify.delete(
    '/:id',
    {
      schema: {
        params: orderIdParamSchema,
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
    orderController.deleteOrder.bind(orderController)
  );
}
