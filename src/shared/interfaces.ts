export interface DataListResponse<T> {
  data: T[],
  total: number
}

export interface FetcherOptions {
  accessToken?: string
  isLocal?: boolean
}
