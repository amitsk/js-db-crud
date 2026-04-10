import { z } from "zod"
export declare const createOrderSchema: z.ZodObject<{
  userId: z.ZodNumber
  totalAmount: z.ZodNumber
  status: z.ZodDefault<z.ZodString>
}, "strip", z.ZodTypeAny, {
  status?: string
  userId?: number
  totalAmount?: number
}, {
  status?: string
  userId?: number
  totalAmount?: number
}>
export declare const updateOrderSchema: z.ZodObject<{
  userId: z.ZodOptional<z.ZodNumber>
  totalAmount: z.ZodOptional<z.ZodNumber>
  status: z.ZodOptional<z.ZodDefault<z.ZodString>>
}, "strip", z.ZodTypeAny, {
  status?: string
  userId?: number
  totalAmount?: number
}, {
  status?: string
  userId?: number
  totalAmount?: number
}>
export declare const orderResponseSchema: z.ZodObject<{
  id: z.ZodNumber
  userId: z.ZodNumber
  totalAmount: z.ZodNumber
  status: z.ZodString
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny, {
  status?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  totalAmount?: number
}, {
  status?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  totalAmount?: number
}>
export declare const ordersListResponseSchema: z.ZodObject<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    userId: z.ZodNumber
    totalAmount: z.ZodNumber
    status: z.ZodString
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }, {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny, {
  data?: {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}, {
  data?: {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}>
declare const CreateOrderDto_base: import("nestjs-zod").ZodDto<{
  status?: string
  userId?: number
  totalAmount?: number
}, z.ZodObjectDef<{
  userId: z.ZodNumber
  totalAmount: z.ZodNumber
  status: z.ZodDefault<z.ZodString>
}, "strip", z.ZodTypeAny>, {
  status?: string
  userId?: number
  totalAmount?: number
}>
export declare class CreateOrderDto extends CreateOrderDto_base {}
declare const UpdateOrderDto_base: import("nestjs-zod").ZodDto<{
  status?: string
  userId?: number
  totalAmount?: number
}, z.ZodObjectDef<{
  userId: z.ZodOptional<z.ZodNumber>
  totalAmount: z.ZodOptional<z.ZodNumber>
  status: z.ZodOptional<z.ZodDefault<z.ZodString>>
}, "strip", z.ZodTypeAny>, {
  status?: string
  userId?: number
  totalAmount?: number
}>
export declare class UpdateOrderDto extends UpdateOrderDto_base {}
declare const OrderResponseDto_base: import("nestjs-zod").ZodDto<{
  status?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  totalAmount?: number
}, z.ZodObjectDef<{
  id: z.ZodNumber
  userId: z.ZodNumber
  totalAmount: z.ZodNumber
  status: z.ZodString
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny>, {
  status?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  totalAmount?: number
}>
export declare class OrderResponseDto extends OrderResponseDto_base {}
declare const OrdersListResponseDto_base: import("nestjs-zod").ZodDto<{
  data?: {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}, z.ZodObjectDef<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    userId: z.ZodNumber
    totalAmount: z.ZodNumber
    status: z.ZodString
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }, {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny>, {
  data?: {
    status?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    totalAmount?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}>
export declare class OrdersListResponseDto extends OrdersListResponseDto_base {}
export {}
