import { z } from "zod"
export declare const idSchema: z.ZodNumber
export declare const paginationSchema: z.ZodObject<{
  limit: z.ZodDefault<z.ZodNumber>
  offset: z.ZodDefault<z.ZodNumber>
}, "strip", z.ZodTypeAny, {
  limit?: number
  offset?: number
}, {
  limit?: number
  offset?: number
}>
export declare const baseEntitySchema: z.ZodObject<{
  id: z.ZodNumber
  createdAt: z.ZodDate
  updatedAt: z.ZodDate
}, "strip", z.ZodTypeAny, {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}, {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}>
