import { FastifyInstance } from 'fastify';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  listProductsQuerySchema,
} from './product.schema';

export async function productRoutes(fastify: FastifyInstance) {
  const productService = new ProductService(fastify.db);
  const productController = new ProductController(productService);

  // GET /api/products - List all products with pagination
  fastify.get(
    '/',
    {
      schema: {
        querystring: listProductsQuerySchema,
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: ['string', 'null'] },
                price: { type: 'string' },
                stock: { type: 'number' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
              },
            },
          },
        },
      },
    },
    productController.listProducts.bind(productController)
  );

  // GET /api/products/:id - Get product by ID
  fastify.get(
    '/:id',
    {
      schema: {
        params: productIdParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              price: { type: 'string' },
              stock: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    productController.getProduct.bind(productController)
  );

  // POST /api/products - Create new product
  fastify.post(
    '/',
    {
      schema: {
        body: createProductSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              price: { type: 'string' },
              stock: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    productController.createProduct.bind(productController)
  );

  // PUT /api/products/:id - Update product
  fastify.put(
    '/:id',
    {
      schema: {
        params: productIdParamSchema,
        body: updateProductSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              price: { type: 'string' },
              stock: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    productController.updateProduct.bind(productController)
  );

  // DELETE /api/products/:id - Delete product
  fastify.delete(
    '/:id',
    {
      schema: {
        params: productIdParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    productController.deleteProduct.bind(productController)
  );
}
