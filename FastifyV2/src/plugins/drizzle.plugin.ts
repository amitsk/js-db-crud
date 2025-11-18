import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { db } from '../db/index';

const drizzlePlugin: FastifyPluginAsync = async (fastify) => {
  // Decorate fastify instance with db
  fastify.decorate('db', db);

  // Add transaction helper
  fastify.decorate('tx', async <T>(callback: (tx: typeof db) => Promise<T>): Promise<T> => {
    return await db.transaction(async (tx) => {
      return await callback(tx as typeof db);
    });
  });

  fastify.log.info('✅ Drizzle ORM plugin registered');
};

export default fp(drizzlePlugin, {
  name: 'drizzle-plugin',
});
