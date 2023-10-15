export type PaginatedResponse<D = unknown> = {
  count: 0;
  next: string | null;
  previous: string | null;
  results: D[];
};
