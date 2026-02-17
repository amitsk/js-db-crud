import createError from 'http-errors';
import { UserRepository } from './user.repository';
import { CreateUserInput, UpdateUserInput } from './user.schema';
import { Database } from '../../db/index';

export class UserService {
  private repository: UserRepository;

  constructor(db: Database) {
    this.repository = new UserRepository(db);
  }

  async listUsers(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getUserById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw createError(404, 'User not found');
    }
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(input: CreateUserInput) {
    // Check if email already exists
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw createError(400, 'Email already exists');
    }

    // In production, hash the password properly (e.g., using bcrypt)
    // For this example, we'll just use a simple hash indicator
    const passwordHash = `hashed_${input.password}`;

    const newUser = await this.repository.create({
      email: input.email,
      passwordHash,
      name: input.name,
      role: input.role || 'customer',
    });

    // Remove password hash from response
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(id: number, input: UpdateUserInput) {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw createError(404, 'User not found');
    }

    // If email is being updated, check for conflicts
    if (input.email && input.email !== existingUser.email) {
      const emailExists = await this.repository.findByEmail(input.email);
      if (emailExists) {
        throw createError(400, 'Email already exists');
      }
    }

    const updatedUser = await this.repository.update(id, input);
    if (!updatedUser) {
      throw createError(404, 'User not found');
    }

    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id: number) {
    const deletedUser = await this.repository.delete(id);
    if (!deletedUser) {
      throw createError(404, 'User not found');
    }
    return { message: 'User deleted successfully' };
  }
}
