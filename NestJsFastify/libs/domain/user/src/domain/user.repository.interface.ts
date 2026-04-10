import { User } from "./user.entity"
import { NewUser } from "../../../../infrastructure/database/src"

export interface IUserRepository {
  findAll(limit: number, offset: number): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: NewUser): Promise<User>
  update(id: number, user: Partial<NewUser>): Promise<User | null>
  delete(id: number): Promise<boolean>
}
