import {
  type QueryFunctionContext,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

/**
 * Swagger type:
 * "url": "string",
  "name": "string",
  "type": "quantitative",
  "tags": [
    "string"
  ],
  "file": "string",
  "analysis_date": "2023-10-15",
  "diagnosis": "string",
  "quantitative_analysis_entries": [
    {
      "name": "string",
      "value": 0,
      "unit": "string"
    }
  ]
 */
export type GetAnalysisResponse = {
  url: string;
  name: string;
  type: "quantitative" | "qualitative";
  tags: string[];
  display_image?: boolean;
  file: string;
  analysis_date: string;
  diagnosis: string;
  quantitative_analysis_entries: {
    name: string;
    value: number;
    unit: string;
  }[];
};

type UseSessionQueryOptions = Omit<
  UseQueryOptions<
    GetAnalysisResponse,
    unknown,
    GetAnalysisResponse,
    [string, string | null]
  >,
  "queryFn"
>;

export const fetchAnalysisById = async (
  ctx: QueryFunctionContext<[string, string | null], any>,
) => {
  const [_, postId] = ctx.queryKey;

  if (!postId) {
    throw new Error("postId is required");
  }

  const { data } = await apiClient.get<GetAnalysisResponse>(
    `/analysis/analysis_entries/${postId}`,
  );
  return data;
};

export const useAnalysisByIdQuery = ({
  ...options
}: UseSessionQueryOptions = {}) => {
  return useQuery<
    GetAnalysisResponse,
    unknown,
    GetAnalysisResponse,
    [string, string | null]
  >({
    queryFn: fetchAnalysisById,
    ...options,
  });
};
