import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

/**
 * JWT Authentication Plugin (Stub)
 *
 * This is a placeholder for JWT authentication.
 * In production, you would:
 * 1. Install @fastify/jwt
 * 2. Implement proper JWT signing/verification
 * 3. Add authentication hooks
 * 4. Create protected route decorators
 *
 * Example implementation:
 * - fastify.register(import('@fastify/jwt'), { secret: 'your-secret-key' })
 * - Add onRequest hooks for protected routes
 * - Verify JWT tokens and attach user to request
 */

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // Stub: Add your JWT configuration here
  fastify.log.info('🔐 Auth plugin registered (stub - implement JWT as needed)');

  // Example decorator for checking authentication
  fastify.decorate('authenticate', async (request: any, reply: any) => {
    // TODO: Implement JWT verification
    // const token = request.headers.authorization?.replace('Bearer ', '');
    // if (!token) {
    //   return reply.status(401).send({ error: 'Unauthorized' });
    // }
    // Verify token and attach user to request
  });
};

export default fp(authPlugin, {
  name: 'auth-plugin',
});
