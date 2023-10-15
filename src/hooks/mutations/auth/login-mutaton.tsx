import {
  type UseMutationOptions,
  useMutation,
  type MutationFunction,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

type LoginResponse = { key: string };

type LoginFormData = {
  username: string;
  email: string;
  password: string;
};

type UseRequestOtpProps = Omit<
  UseMutationOptions<LoginResponse, unknown, LoginFormData>,
  "mutationFn"
>;

const fetchLogin: MutationFunction<LoginResponse, LoginFormData> = async (
  formData,
) => {
  const { data } = await apiClient.post<LoginResponse>("/login", formData);

  return data;
};

export const useLoginMutation = (props?: UseRequestOtpProps) => {
  return useMutation<LoginResponse, unknown, LoginFormData>(
    ["login"],
    fetchLogin,
    {
      cacheTime: 0,
      retry: false,
      ...props,
    },
  );
};
