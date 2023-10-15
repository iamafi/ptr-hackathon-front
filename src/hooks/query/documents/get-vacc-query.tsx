import {
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { PaginatedResponse } from "@/types/pagination";

type GetDocumentsReponse = PaginatedResponse<DocumentItem>;

export type DocumentItem = {
  id: number;
  title: string;
  type: number;
  file: string;
  given_by: {
    title: string
  };
  created_date: string;
  received_date: string;
  expiration_date: string;
  expired: boolean;
};

export const fetchDocuments: QueryFunction<
  GetDocumentsReponse,
  QueryKey,
  { next: GetDocumentsReponse["next"] }
> = async ({ pageParam }) => {
  const url = pageParam?.next
    ? new URL(pageParam.next)
    : new URL(
        "/api/medical_tests/vaccines",
        apiClient.defaults.baseURL,
      );
  const { data } = await apiClient.get<GetDocumentsReponse>(url.toString());

  return data;
};

export const useVaccInfiniteQuery = () => {
  return useInfiniteQuery<GetDocumentsReponse>({
    queryKey: ["vacc"],
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
