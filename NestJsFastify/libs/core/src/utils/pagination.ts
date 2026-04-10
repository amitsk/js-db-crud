export interface PaginationOptions {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export function getPaginationOptions(query: any): PaginationOptions {
  const limit = Math.min(parseInt(query.limit) || 10, 100);
  const offset = parseInt(query.offset) || 0;
  return { limit, offset };
}
