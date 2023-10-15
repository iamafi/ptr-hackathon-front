import type { NextPage } from "next";
import { FileIcon, FilterIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  GetAnalysisItems,
  useAnalysisListInfiniteQuery,
} from "@/hooks/query/analysis/get-analysis-list-query";

const AnalysisPage: NextPage = () => {
  return (
    <>
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Мои анализы</h1>
        <Button
          className={"h-10 w-10"}
          variant={"default"}
          size={"icon"}
          asChild
        >
          <Link href={"/analysis/submit"}>
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mb-6 flex flex-row gap-4">
        <Input placeholder="Поиск Анализов" />
        <Button
          className={"h-10 w-10 p-2.5"}
          variant={"secondary"}
          size={"icon"}
        >
          <FilterIcon fill="currentColor" />
        </Button>
      </div>
      <AnalysisList />
    </>
  );
};

const AnalysisList: React.FC = () => {
  const { data, isLoading } = useAnalysisListInfiniteQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!data?.pages[0]?.results?.length) {
    return <div>Нет анализов</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {data.pages.flatMap((page) =>
        page.results.map((analysis, i) => (
          <AnalysisCard analysis={analysis} key={i} />
        )),
      )}
    </div>
  );
};

const AnalysisCard: React.FC<{
  analysis: GetAnalysisItems;
}> = ({ analysis }) => {
  const analysisId = analysis.url.split("/").filter(Boolean).pop();

  return (
    <Link
      href={`/analysis/${analysisId}`}
      className="rounded-sm border border-slate-100 p-4"
    >
      <div className="mb-4 flex flex-row flex-wrap gap-2.5 empty:hidden">
        {analysis.tags.map((tag, i) => (
          <Badge
            key={i}
            style={{
              color: tag.text_color,
              backgroundColor: tag.background_color,
            }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-bold">{analysis.name}</h3>
          <p className="text-sm font-normal">
            {analysis.type === "quantitative"
              ? `${analysis.quantitative_analysis_entries_count} амбулаторных показателей`
              : "Снимок"}
          </p>
        </div>
        <div className="relative h-12 w-16">
          {analysis.display_image ? (
            <img
              className="h-12 w-16 rounded-xs object-cover"
              src={analysis.file}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xs bg-slate-100">
              <FileIcon />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnalysisPage;
