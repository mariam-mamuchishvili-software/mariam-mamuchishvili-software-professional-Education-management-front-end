export interface ApiListResponse<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiItemResponse<T> {
  data: T;
}
