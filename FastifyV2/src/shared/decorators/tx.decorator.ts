import { FastifyInstance } from 'fastify';
import { db } from '../../db/index';

export function registerTransactionDecorator(fastify: FastifyInstance) {
  fastify.decorate('tx', async <T>(callback: (tx: typeof db) => Promise<T>): Promise<T> => {
    return await db.transaction(async (tx) => {
      return await callback(tx as typeof db);
    });
  });
}
