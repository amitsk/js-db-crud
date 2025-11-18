import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  UpdateProductInput,
  ProductIdParam,
  ListProductsQuery,
} from './product.schema';

export class ProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  async listProducts(
    request: FastifyRequest<{ Querystring: ListProductsQuery }>,
    reply: FastifyReply
  ) {
    const { limit, offset } = request.query;
    const products = await this.service.listProducts(Number(limit), Number(offset));
    return reply.send(products);
  }

  async getProduct(
    request: FastifyRequest<{ Params: ProductIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const product = await this.service.getProductById(Number(id));
    return reply.send(product);
  }

  async createProduct(
    request: FastifyRequest<{ Body: CreateProductInput }>,
    reply: FastifyReply
  ) {
    const product = await this.service.createProduct(request.body);
    return reply.status(201).send(product);
  }

  async updateProduct(
    request: FastifyRequest<{ Params: ProductIdParam; Body: UpdateProductInput }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const product = await this.service.updateProduct(Number(id), request.body);
    return reply.send(product);
  }

  async deleteProduct(
    request: FastifyRequest<{ Params: ProductIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const result = await this.service.deleteProduct(Number(id));
    return reply.status(200).send(result);
  }
}
