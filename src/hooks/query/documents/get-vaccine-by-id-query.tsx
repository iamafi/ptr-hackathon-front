import {
  type QueryFunctionContext,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

type GetVaccineResponse = {
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
    GetVaccineResponse,
    unknown,
    GetVaccineResponse,
    [string, string | null]
  >,
  "queryFn"
>;

export const fetchVaccineById = async (
  ctx: QueryFunctionContext<[string, string | null], unknown>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, vaccId] = ctx.queryKey;

  if (!vaccId) {
    throw new Error("postId is required");
  }

  const { data } = await apiClient.get<GetVaccineResponse>(
    `/medical_tests/vaccines/${vaccId}`,
  );
  return data;
};

export const useVaccineByIdQuery = ({
  ...options
}: UseSessionQueryOptions = {}) => {
  return useQuery<
    GetVaccineResponse,
    unknown,
    GetVaccineResponse,
    [string, string | null]
  >({
    queryFn: fetchVaccineById,
    ...options,
  });
};
