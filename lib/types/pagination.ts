export interface PaginatedResult<T> {
  data: T[]
  meta: PaginatedMeta
}

export interface PaginatedMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
  qs?: Record<string, any>
}
