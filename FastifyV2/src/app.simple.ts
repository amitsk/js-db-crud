import { FastifyInstance } from 'fastify';
import { userRoutes } from './modules/user/user.routes.simple';
import { productRoutes } from './modules/product/product.routes.simple';
import { orderRoutes } from './modules/order/order.routes.simple';

export async function registerRoutes(fastify: FastifyInstance) {
  // Health check
  fastify.get('/', async () => ({
    status: 'ok',
    message: 'Fastify + Drizzle ORM API',
    timestamp: new Date().toISOString(),
  }));

  // Register routes
  await fastify.register(userRoutes, { prefix: '/api/users' });
  await fastify.register(productRoutes, { prefix: '/api/products' });
  await fastify.register(orderRoutes, { prefix: '/api/orders' });
}
