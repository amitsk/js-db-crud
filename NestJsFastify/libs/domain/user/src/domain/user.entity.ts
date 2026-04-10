import { User as UserType } from "../../../../infrastructure/database/src"

export class User {
  constructor(
    public readonly id: number,
    public email: string,
    public password: string,
    public name: string,
    public role: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromDb(user: UserType): User {
    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.name,
      user.role,
      user.createdAt,
      user.updatedAt,
    )
  }

  toDb() {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.password,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
