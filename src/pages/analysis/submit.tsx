import { useSubmitAnalysisMutation } from "@/hooks/mutations/analysis/submit-analysis-mutation";
import type { CustomNextPage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useAnalysisTagsInfiniteQuery } from "@/hooks/query/analysis/get-analysis-tags-query";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";

const submitAnalysisFormSchema = z.object({
  name: z.string(),
  type: z.enum(["quantitative", "qualitative"] as const),
  tags: z.string(),
  file: z.custom<File>((file) => file instanceof File),
  analysis_date: z.string(),
});

const SubmitAnalysisPage: CustomNextPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof submitAnalysisFormSchema>>({
    resolver: zodResolver(submitAnalysisFormSchema),
    defaultValues: {
      type: "quantitative",
    },
  });

  const submitAnalysisMutation = useSubmitAnalysisMutation({
    onSuccess: () => {
      form.reset();
      void router.push("/analysis");
    },
  });

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image),
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]!);

    return { files, displayUrl };
  }

  function onSubmit(values: z.infer<typeof submitAnalysisFormSchema>) {
    submitAnalysisMutation.mutate({
      ...values,
      tags: [values.tags],
      analysis_date: format(new Date(values.analysis_date), "yyyy-MM-dd"),
    });
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип анализа</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип анализа" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="quantitative">Количественный</SelectItem>
                  <SelectItem value="qualitative">Качественный</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Введите название анализа" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <TagsFormItem field={field} type={form.getValues("type")} />
          )}
        />
        <FormField
          control={form.control}
          name="analysis_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата сдачи</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-10 pl-3 text-left font-normal shadow-none",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "dd.MM.yyyy")
                      ) : (
                        <span>Выберите дату сдачи анализа</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) =>
                      field.onChange(
                        date ? format(date, "yyyy-MM-dd") : undefined,
                      )
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Загрузите файл</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf,image/*"
                  placeholder="Загрузите файл"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    const file = files[0];
                    onChange(file);
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size={"lg"}
          disabled={submitAnalysisMutation.isLoading}
        >
          Сохранить данные об анализе
        </Button>
      </form>
    </Form>
  );
};

const TagsFormItem: React.FC<{
  field: ControllerRenderProps<
    z.infer<typeof submitAnalysisFormSchema>,
    "tags"
  >;
  type: "quantitative" | "qualitative";
}> = ({ field, type }) => {
  const { data } = useAnalysisTagsInfiniteQuery({ type });

  return (
    <FormItem>
      <FormLabel>Тип анализа</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип анализа" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data?.pages.flatMap((page) =>
            page.results.map((tag) => (
              <SelectItem value={tag.url} key={tag.url}>
                {tag.name}
              </SelectItem>
            )),
          ) ?? []}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

SubmitAnalysisPage.layout = {
  variant: "panel",
  title: "Запись о новом анализe",
};

export default SubmitAnalysisPage;
