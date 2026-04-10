import { User as UserType } from "../../../../infrastructure/database/src"
export declare class User {
  readonly id: number
  email: string
  password: string
  name: string
  role: string
  readonly createdAt: Date
  updatedAt: Date
  constructor(
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
  )
  static fromDb(user: UserType): User
  toDb(): {
    id: number
    email: string
    passwordHash: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
  }
}
