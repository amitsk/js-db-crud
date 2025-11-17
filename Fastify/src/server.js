import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import Fastify from "fastify";
import ordersRoutes from "./routes/orders.js";
import productsRoutes from "./routes/products.js";
import usersRoutes from "./routes/users.js";

const fastify = Fastify({
	logger: true,
});

// Register CORS
await fastify.register(cors, {
	origin: true, // Allow all origins for simplicity
});

await fastify.register(helmet);

await fastify.register(
  import('@fastify/compress')
)

// Register routes
await fastify.register(usersRoutes);
await fastify.register(productsRoutes);
await fastify.register(ordersRoutes);

// Health check
fastify.get("/", async (_request, _reply) => {
	return { message: "Fastify CRUD API is running" };
});

// Start server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
