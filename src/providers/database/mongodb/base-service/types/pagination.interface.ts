export interface IPagination<T> {
  items: T[];
  meta: IPaginationMeta;
}

export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  cursor: string | undefined;
  hasNextPage: boolean;
}
