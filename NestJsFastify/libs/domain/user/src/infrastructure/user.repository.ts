import { Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { DatabaseService } from "../../../../core/src"
import {
  users,
  NewUser,
} from "../../../../infrastructure/database/src"
import { User } from "../domain/user.entity"
import { IUserRepository } from "../domain/user.repository.interface"

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(limit: number, offset: number): Promise<User[]> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .limit(limit)
      .offset(offset)

    return result.map(User.fromDb)
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return result.length > 0 ? User.fromDb(result[0]) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return result.length > 0 ? User.fromDb(result[0]) : null
  }

  async create(userData: NewUser): Promise<User> {
    const result = await this.databaseService.db
      .insert(users)
      .values(userData)
      .returning()

    return User.fromDb(result[0])
  }

  async update(id: number, userData: Partial<NewUser>): Promise<User | null> {
    const result = await this.databaseService.db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning()

    return result.length > 0 ? User.fromDb(result[0]) : null
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id })

    return result.length > 0
  }
}
