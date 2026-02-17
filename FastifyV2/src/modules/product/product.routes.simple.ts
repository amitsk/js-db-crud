import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import createError from 'http-errors';
import { products } from '../../db/schema';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  listProductsQuerySchema,
} from './product.schema';

export async function productRoutes(fastify: FastifyInstance) {
  // GET /api/products - List all products
  fastify.get('/', {
    schema: { querystring: listProductsQuerySchema },
  }, async (request) => {
    const { limit, offset } = request.query as any;
    return await fastify.db.select().from(products).limit(limit).offset(offset);
  });

  // GET /api/products/:id - Get product by ID
  fastify.get('/:id', {
    schema: { params: productIdParamSchema },
  }, async (request) => {
    const { id } = request.params as any;

    const [product] = await fastify.db.select().from(products).where(eq(products.id, id)).limit(1);
    if (!product) throw createError(404, 'Product not found');

    return product;
  });

  // POST /api/products - Create product
  fastify.post('/', {
    schema: { body: createProductSchema },
  }, async (request, reply) => {
    const body = request.body as any;

    const [newProduct] = await fastify.db.insert(products).values({
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock || 0,
    }).returning();

    return reply.status(201).send(newProduct);
  });

  // PUT /api/products/:id - Update product
  fastify.put('/:id', {
    schema: {
      params: productIdParamSchema,
      body: updateProductSchema,
    },
  }, async (request) => {
    const { id } = request.params as any;
    const body = request.body as any;

    const [updated] = await fastify.db
      .update(products)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    if (!updated) throw createError(404, 'Product not found');
    return updated;
  });

  // DELETE /api/products/:id - Delete product
  fastify.delete('/:id', {
    schema: { params: productIdParamSchema },
  }, async (request, reply) => {
    const { id } = request.params as any;

    const [deleted] = await fastify.db.delete(products).where(eq(products.id, id)).returning();
    if (!deleted) throw createError(404, 'Product not found');

    return reply.send({ message: 'Product deleted successfully' });
  });
}
