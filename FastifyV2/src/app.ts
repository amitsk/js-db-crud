import { FastifyInstance } from 'fastify';
import drizzlePlugin from './plugins/drizzle.plugin';
// import authPlugin from './shared/plugins/auth.plugin'; // Uncomment when ready to use

import { userRoutes } from './modules/user/user.routes';
import { productRoutes } from './modules/product/product.routes';
import { orderRoutes } from './modules/order/order.routes';

export async function registerPlugins(fastify: FastifyInstance) {
  // Register Drizzle ORM plugin
  await fastify.register(drizzlePlugin);

  // Register Auth plugin (stub - uncomment when implementing JWT)
  // await fastify.register(authPlugin);
}

export async function registerRoutes(fastify: FastifyInstance) {
  // Health check route
  fastify.get('/', async () => {
    return {
      status: 'ok',
      message: 'Fastify + Drizzle ORM API',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    };
  });

  // Register module routes with prefixes
  await fastify.register(userRoutes, { prefix: '/api/users' });
  await fastify.register(productRoutes, { prefix: '/api/products' });
  await fastify.register(orderRoutes, { prefix: '/api/orders' });

  fastify.log.info('✅ All routes registered');
}
