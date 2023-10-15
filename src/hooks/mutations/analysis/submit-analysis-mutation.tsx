import {
  type UseMutationOptions,
  useMutation,
  type MutationFunction,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

type SubmitAnalysisResponse = any;

type SubmitAnalysisFormData = {
  name: string;
  type: "quantitative" | "qualitative";
  tags: string[];
  file: File;
  analysis_date: string;
};

type UseSubmitAnalysisProps = Omit<
  UseMutationOptions<SubmitAnalysisResponse, unknown, SubmitAnalysisFormData>,
  "mutationFn"
>;

const appendFormData = (formData: FormData, data: object, name: string) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      appendFormData(formData, data[i], `${name}`);
    }
  } else if (typeof data === "object" && data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        appendFormData(formData, data[key], name ? `${name}.${key}` : key);
      }
    }
  } else {
    formData.append(name, data);
  }
};

const fetchSubmit: MutationFunction<
  SubmitAnalysisResponse,
  SubmitAnalysisFormData
> = async (formData) => {
  console.log(formData);

  const fd = new FormData();
  fd.append("file", formData.file);
  appendFormData(fd, formData, "");

  const { data } = await apiClient.post<SubmitAnalysisResponse>(
    "/analysis/analysis_entries",
    fd,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const useSubmitAnalysisMutation = (props?: UseSubmitAnalysisProps) => {
  return useMutation<SubmitAnalysisResponse, unknown, SubmitAnalysisFormData>(
    ["submit-analysis"],
    fetchSubmit,
    {
      cacheTime: 0,
      retry: false,
      ...props,
    },
  );
};
