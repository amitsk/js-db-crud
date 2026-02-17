import { FastifyInstance } from 'fastify';
import { Database } from '../db/index';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    tx: <T>(callback: (tx: Database) => Promise<T>) => Promise<T>;
  }
}
