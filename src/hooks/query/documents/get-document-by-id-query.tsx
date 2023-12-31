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
type GetAnalysisResponse = {
  created_date: string;
  display_image: boolean;
  expiration_date: string;
  expired: boolean;
  file: string;
  given_by: {
    id: number;
    title: string;
  };
  id: number;
  received_date: string;
  title: string;
  type: number;
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

export const fetchDocById = async (
  ctx: QueryFunctionContext<[string, string | null], unknown>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, docId] = ctx.queryKey;

  if (!docId) {
    throw new Error("postId is required");
  }

  const { data } = await apiClient.get<GetAnalysisResponse>(
    `/medical_tests/medical_certificates/${docId}`,
  );
  return data;
};

export const useDocByIdQuery = ({
  ...options
}: UseSessionQueryOptions = {}) => {
  return useQuery<
    GetAnalysisResponse,
    unknown,
    GetAnalysisResponse,
    [string, string | null]
  >({
    queryFn: fetchDocById,
    ...options,
  });
};
