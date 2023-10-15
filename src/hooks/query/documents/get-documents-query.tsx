import {
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { PaginatedResponse } from "@/types/pagination";

type GetDocumentsReponse = PaginatedResponse<{
  type: number;
  file: string;
  given_by: number;
  created_date: string;
  received_date: string;
  expiration_date: string;
  expired: "string";
}>;

export const fetchDocuments: QueryFunction<
  GetDocumentsReponse,
  QueryKey,
  { next: GetDocumentsReponse["next"] }
> = async ({ pageParam }) => {
  const url = pageParam?.next
    ? new URL(pageParam.next)
    : new URL(
        "/api/medical_certificates/medical_tests",
        apiClient.defaults.baseURL,
      );
  const { data } = await apiClient.get<GetDocumentsReponse>(url.toString());

  return data;
};

export const useDocumentsInfiniteQuery = () => {
  return useInfiniteQuery<GetDocumentsReponse>({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return false;
      }

      return {
        next: lastPage.next,
      };
    },
    refetchOnWindowFocus: false,
  });
};
