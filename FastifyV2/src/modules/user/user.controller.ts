import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';
import {
  CreateUserInput,
  UpdateUserInput,
  UserIdParam,
  ListUsersQuery,
} from './user.schema';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async listUsers(
    request: FastifyRequest<{ Querystring: ListUsersQuery }>,
    reply: FastifyReply
  ) {
    const { limit, offset } = request.query;
    const users = await this.service.listUsers(Number(limit), Number(offset));
    return reply.send(users);
  }

  async getUser(
    request: FastifyRequest<{ Params: UserIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const user = await this.service.getUserById(Number(id));
    return reply.send(user);
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const user = await this.service.createUser(request.body);
    return reply.status(201).send(user);
  }

  async updateUser(
    request: FastifyRequest<{ Params: UserIdParam; Body: UpdateUserInput }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const user = await this.service.updateUser(Number(id), request.body);
    return reply.send(user);
  }

  async deleteUser(
    request: FastifyRequest<{ Params: UserIdParam }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const result = await this.service.deleteUser(Number(id));
    return reply.status(200).send(result);
  }
}
