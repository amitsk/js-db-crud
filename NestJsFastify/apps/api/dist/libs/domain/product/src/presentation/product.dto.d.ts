import { z } from "zod"
export declare const createProductSchema: z.ZodObject<{
  name: z.ZodString
  description: z.ZodOptional<z.ZodString>
  price: z.ZodNumber
  stock: z.ZodDefault<z.ZodNumber>
}, "strip", z.ZodTypeAny, {
  name?: string
  description?: string
  price?: number
  stock?: number
}, {
  name?: string
  description?: string
  price?: number
  stock?: number
}>
export declare const updateProductSchema: z.ZodObject<{
  name: z.ZodOptional<z.ZodString>
  description: z.ZodOptional<z.ZodOptional<z.ZodString>>
  price: z.ZodOptional<z.ZodNumber>
  stock: z.ZodOptional<z.ZodDefault<z.ZodNumber>>
}, "strip", z.ZodTypeAny, {
  name?: string
  description?: string
  price?: number
  stock?: number
}, {
  name?: string
  description?: string
  price?: number
  stock?: number
}>
export declare const productResponseSchema: z.ZodObject<{
  id: z.ZodNumber
  name: z.ZodString
  description: z.ZodOptional<z.ZodString>
  price: z.ZodNumber
  stock: z.ZodNumber
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny, {
  name?: string
  description?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  price?: number
  stock?: number
}, {
  name?: string
  description?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  price?: number
  stock?: number
}>
export declare const productsListResponseSchema: z.ZodObject<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    name: z.ZodString
    description: z.ZodOptional<z.ZodString>
    price: z.ZodNumber
    stock: z.ZodNumber
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }, {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny, {
  data?: {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}, {
  data?: {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}>
declare const CreateProductDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  description?: string
  price?: number
  stock?: number
}, z.ZodObjectDef<{
  name: z.ZodString
  description: z.ZodOptional<z.ZodString>
  price: z.ZodNumber
  stock: z.ZodDefault<z.ZodNumber>
}, "strip", z.ZodTypeAny>, {
  name?: string
  description?: string
  price?: number
  stock?: number
}>
export declare class CreateProductDto extends CreateProductDto_base {}
declare const UpdateProductDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  description?: string
  price?: number
  stock?: number
}, z.ZodObjectDef<{
  name: z.ZodOptional<z.ZodString>
  description: z.ZodOptional<z.ZodOptional<z.ZodString>>
  price: z.ZodOptional<z.ZodNumber>
  stock: z.ZodOptional<z.ZodDefault<z.ZodNumber>>
}, "strip", z.ZodTypeAny>, {
  name?: string
  description?: string
  price?: number
  stock?: number
}>
export declare class UpdateProductDto extends UpdateProductDto_base {}
declare const ProductResponseDto_base: import("nestjs-zod").ZodDto<{
  name?: string
  description?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  price?: number
  stock?: number
}, z.ZodObjectDef<{
  id: z.ZodNumber
  name: z.ZodString
  description: z.ZodOptional<z.ZodString>
  price: z.ZodNumber
  stock: z.ZodNumber
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny>, {
  name?: string
  description?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  price?: number
  stock?: number
}>
export declare class ProductResponseDto extends ProductResponseDto_base {}
declare const ProductsListResponseDto_base: import("nestjs-zod").ZodDto<{
  data?: {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}, z.ZodObjectDef<{
  data: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber
    name: z.ZodString
    description: z.ZodOptional<z.ZodString>
    price: z.ZodNumber
    stock: z.ZodNumber
    createdAt: z.ZodDate
    updatedAt: z.ZodDate
  }, "strip", z.ZodTypeAny, {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }, {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }>, "many">
  total: z.ZodNumber
  limit: z.ZodNumber
  offset: z.ZodNumber
}, "strip", z.ZodTypeAny>, {
  data?: {
    name?: string
    description?: string
    id?: number
    createdAt?: Date
    updatedAt?: Date
    price?: number
    stock?: number
  }[]
  limit?: number
  offset?: number
  total?: number
}>
export declare class ProductsListResponseDto extends ProductsListResponseDto_base {}
export {}
