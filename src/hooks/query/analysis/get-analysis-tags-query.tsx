import {
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { PaginatedResponse } from "@/types/pagination";

type GetAnalysisTagsReponse = PaginatedResponse<{
  url: string;
  name: string;
  background_color: string;
  text_color: string;
}>;

export const fetchAnalysisTags = async (
  {
    pageParam,
  }: {
    pageParam?: { next: GetAnalysisTagsReponse["next"] };
  },
  type: "quantitative" | "qualitative",
) => {
  const url = pageParam?.next
    ? new URL(pageParam.next)
    : new URL("/api/analysis/analysis_tags/", apiClient.defaults.baseURL);

  url.searchParams.set("type", type);
  const { data } = await apiClient.get<GetAnalysisTagsReponse>(url.toString());

  return data;
};

export const useAnalysisTagsInfiniteQuery = ({
  type,
}: {
  type: "quantitative" | "qualitative";
}) => {
  return useInfiniteQuery<GetAnalysisTagsReponse>({
    queryKey: ["analysis-tags", { type }],
    queryFn: async (ctx) => fetchAnalysisTags(ctx, type),
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
