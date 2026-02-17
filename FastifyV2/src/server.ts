import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import { config } from './config/index';
import { registerPlugins, registerRoutes } from './app';

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      config.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

// Register global plugins
async function setupServer() {
  try {
    // CORS
    await fastify.register(cors, {
      origin: config.NODE_ENV === 'production' ? false : true, // Configure properly for production
      credentials: true,
    });

    // Security headers
    await fastify.register(helmet, {
      contentSecurityPolicy: config.NODE_ENV === 'production' ? undefined : false,
    });

    // Compression
    await fastify.register(compress, {
      global: true,
      encodings: ['gzip', 'deflate'],
    });

    // Register custom plugins (Drizzle, etc.)
    await registerPlugins(fastify);

    // Register all routes
    await registerRoutes(fastify);

    // Global error handler
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);

      // Handle http-errors
      if (error.statusCode) {
        return reply.status(error.statusCode).send({
          error: error.message,
          statusCode: error.statusCode,
        });
      }

      // Handle validation errors
      if (error.validation) {
        return reply.status(400).send({
          error: 'Validation error',
          details: error.validation,
          statusCode: 400,
        });
      }

      // Default error response
      return reply.status(500).send({
        error: config.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
        statusCode: 500,
      });
    });

    // Start server
    await fastify.listen({
      port: config.PORT,
      host: config.HOST,
    });

    console.log(`
╔═══════════════════════════════════════════════╗
║  🚀 FastifyV2 Server Running                  ║
║  📡 http://${config.HOST}:${config.PORT}                    ║
║  🌍 Environment: ${config.NODE_ENV.padEnd(28)} ║
║  ⚡ Ready to handle requests!                 ║
╚═══════════════════════════════════════════════╝
    `);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Handle shutdown gracefully
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\n${signal} received, closing server gracefully...`);
    await fastify.close();
    process.exit(0);
  });
});

// Start the server
setupServer();
