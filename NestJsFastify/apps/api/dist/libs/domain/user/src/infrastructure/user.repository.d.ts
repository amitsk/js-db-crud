import { DatabaseService } from "../../../../core/src"
import { NewUser } from "../../../../infrastructure/database/src"
import { User } from "../domain/user.entity"
import { IUserRepository } from "../domain/user.repository.interface"
export declare class UserRepository implements IUserRepository {
  private readonly databaseService
  constructor(databaseService: DatabaseService)
  findAll(limit: number, offset: number): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(userData: NewUser): Promise<User>
  update(id: number, userData: Partial<NewUser>): Promise<User | null>
  delete(id: number): Promise<boolean>
}
