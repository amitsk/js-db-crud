import { Injectable } from "@nestjs/common"
import { User } from "../domain/user.entity"
import { UserRepository } from "../infrastructure/user.repository"
import { NewUser } from "../../../../infrastructure/database/src"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(limit: number, offset: number): Promise<User[]> {
    return this.userRepository.findAll(limit, offset)
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async create(userData: NewUser): Promise<User> {
    return this.userRepository.create(userData)
  }

  async update(id: number, userData: Partial<NewUser>): Promise<User | null> {
    return this.userRepository.update(id, userData)
  }

  async delete(id: number): Promise<boolean> {
    return this.userRepository.delete(id)
  }
}
