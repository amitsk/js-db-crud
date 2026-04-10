import { z } from "zod"
export declare const createUserSchema: z.ZodObject<{
  email: z.ZodString
  password: z.ZodString
  name: z.ZodString
  role: z.ZodDefault<z.ZodEnum<["customer", "admin"]>>
}, "strip", z.ZodTypeAny, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}>
export declare const updateUserSchema: z.ZodObject<{
  email: z.ZodOptional<z.ZodString>
  password: z.ZodOptional<z.ZodString>
  name: z.ZodOptional<z.ZodString>
  role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["customer", "admin"]>>>
}, "strip", z.ZodTypeAny, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}>
export declare const userResponseSchema: z.ZodObject<{
  id: z.ZodNumber
  email: z.ZodString
  name: z.ZodString
  role: z.ZodString
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny, {
  name?: string
  id?: number
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}, {
  name?: string
  id?: number
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}>
export declare const usersListResponseSchema: z.ZodObject<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    email: z.ZodString
    name: z.ZodString
    role: z.ZodString
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }, {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny, {
  data?: {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }[]
  limit?: number
  offset?: number
  total?: number
}, {
  data?: {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }[]
  limit?: number
  offset?: number
  total?: number
}>
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}, z.ZodObjectDef<{
  email: z.ZodString
  password: z.ZodString
  name: z.ZodString
  role: z.ZodDefault<z.ZodEnum<["customer", "admin"]>>
}, "strip", z.ZodTypeAny>, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}>
export declare class CreateUserDto extends CreateUserDto_base {}
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}, z.ZodObjectDef<{
  email: z.ZodOptional<z.ZodString>
  password: z.ZodOptional<z.ZodString>
  name: z.ZodOptional<z.ZodString>
  role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["customer", "admin"]>>>
}, "strip", z.ZodTypeAny>, {
  name?: string
  email?: string
  role?: "customer" | "admin"
  password?: string
}>
export declare class UpdateUserDto extends UpdateUserDto_base {}
declare const UserResponseDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  id?: number
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}, z.ZodObjectDef<{
  id: z.ZodNumber
  email: z.ZodString
  name: z.ZodString
  role: z.ZodString
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny>, {
  name?: string
  id?: number
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}>
export declare class UserResponseDto extends UserResponseDto_base {}
declare const UsersListResponseDto_base: import("nestjs-zod").ZodDto<{
  data?: {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }[]
  limit?: number
  offset?: number
  total?: number
}, z.ZodObjectDef<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    email: z.ZodString
    name: z.ZodString
    role: z.ZodString
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }, {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny>, {
  data?: {
    name?: string
    id?: number
    email?: string
    role?: string
    createdAt?: Date
    updatedAt?: Date
  }[]
  limit?: number
  offset?: number
  total?: number
}>
export declare class UsersListResponseDto extends UsersListResponseDto_base {}
export {}
