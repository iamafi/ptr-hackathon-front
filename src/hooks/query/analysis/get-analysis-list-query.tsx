import {
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { PaginatedResponse } from "@/types/pagination";

export type GetAnalysisItems = {
  url: string;
  name: string;
  type: "quantitative" | "qualitative";
  display_image: boolean;
  tags: Tag[];
  quantitative_analysis_entries_count: 0;
  file: string;
  analysis_date: string;
  diagnosis: string;
};

type Tag = {
  url: string;
  name: string;
  background_color: string;
  text_color: string;
}

type GetAnalysisReponse = PaginatedResponse<GetAnalysisItems>;

export const fetchAnalysis: QueryFunction<
  GetAnalysisReponse,
  QueryKey,
  { next: GetAnalysisReponse["next"] }
> = async ({ pageParam }) => {
  const url = pageParam?.next
    ? new URL(pageParam.next)
    : new URL("/api/analysis/analysis_entries/", apiClient.defaults.baseURL);
  const { data } = await apiClient.get<GetAnalysisReponse>(url.toString());

  return data;
};

export const useAnalysisListInfiniteQuery = () => {
  return useInfiniteQuery<GetAnalysisReponse>({
    queryKey: ["analysis"],
    queryFn: fetchAnalysis,
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
