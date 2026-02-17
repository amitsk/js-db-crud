import { FastifyReply, FastifyRequest } from 'fastify';
import { OrderService } from './order.service';
import {
  CreateOrderInput,
  UpdateOrderInput,
  OrderIdParam,
  ListOrdersQuery,
} from './order.schema';

export class OrderController {
  private service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  async listOrders(
    request: FastifyRequest<{ Querystring: ListOrdersQuery }>,
    reply: FastifyReply
  ) {
    const { limit, offset, userId, status } = request.query;
    const orders = await this.service.listOrders(Number(limit), Number(offset), {
      userId: userId ? Number(userId) : undefined,
      status,
    });
    return reply.send(orders);
  }

  async getOrder(
    request: FastifyRequest<{ Params: OrderIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const order = await this.service.getOrderById(Number(id));
    return reply.send(order);
  }

  async createOrder(
    request: FastifyRequest<{ Body: CreateOrderInput }>,
    reply: FastifyReply
  ) {
    const order = await this.service.createOrder(request.body);
    return reply.status(201).send(order);
  }

  async updateOrder(
    request: FastifyRequest<{ Params: OrderIdParam; Body: UpdateOrderInput }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const order = await this.service.updateOrder(Number(id), request.body);
    return reply.send(order);
  }

  async deleteOrder(
    request: FastifyRequest<{ Params: OrderIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const result = await this.service.deleteOrder(Number(id));
    return reply.status(200).send(result);
  }
}
