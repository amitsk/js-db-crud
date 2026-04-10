export interface PaginationOptions {
  limit?: number
  offset?: number
}
export interface PaginatedResult<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}
export declare function getPaginationOptions(query: any): PaginationOptions
