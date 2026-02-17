import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import { config } from './config';
import { db } from './db';
import { registerRoutes } from './app.simple';

const fastify = Fastify({
  logger: {
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

// Decorate fastify with db
fastify.decorate('db', db);

async function start() {
  try {
    // Register plugins
    await fastify.register(cors, { origin: true });
    await fastify.register(helmet);
    await fastify.register(compress);

    // Register routes
    await registerRoutes(fastify);

    // Global error handler
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);

      const statusCode = error.statusCode || 500;
      const message = error.statusCode ? error.message : 'Internal Server Error';

      reply.status(statusCode).send({
        error: message,
        statusCode,
      });
    });

    // Start server
    await fastify.listen({ port: config.PORT, host: config.HOST });

    console.log(`
🚀 Server running at http://${config.HOST}:${config.PORT}
📚 Environment: ${config.NODE_ENV}
    `);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

start();
