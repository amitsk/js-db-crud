import { User } from "../domain/user.entity"
import { IUserRepository } from "../domain/user.repository.interface"
import { NewUser } from "../../../../infrastructure/database/src"
export declare class UserService {
  private readonly userRepository
  constructor(userRepository: IUserRepository)
  findAll(limit: number, offset: number): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(userData: NewUser): Promise<User>
  update(id: number, userData: Partial<NewUser>): Promise<User | null>
  delete(id: number): Promise<boolean>
}
