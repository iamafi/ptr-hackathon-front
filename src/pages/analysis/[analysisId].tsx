import { DownloadIcon, FileIcon } from "lucide-react";

import type { CustomNextPage } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  GetAnalysisResponse,
  useAnalysisByIdQuery,
} from "@/hooks/query/analysis/get-analysis-by-id-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/utils";
import { Layout } from "@/components/layout/root-layout";

const AnalysisByIdPage: CustomNextPage = () => {
  const router = useRouter();
  const analysisId = router.query.analysisId as string;

  const {
    data: analysis,
    isLoading,
    isError,
  } = useAnalysisByIdQuery({
    queryKey: ["analysis", analysisId],
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!analysis) {
    return <div>Анализ не найден</div>;
  }

  return (
    <Layout useContainer={false} variant={"panel"} title={analysis.name}>
      <div className="mb-6 flex flex-col items-center space-y-4">
        {/* Image placeholder */}
        <div className="relative h-28 w-44">
          {analysis.display_image !== false ? (
            <img
              className="h-28 w-44 rounded-xs object-cover"
              src={analysis.file}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <FileIcon className="h-8 w-8 text-slate-400" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center space-x-2.5">
            <span className="text-sm font-medium">{analysis.name}</span>
            <a
              className="text-rose-700"
              href={analysis.file}
              download
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon size={16} />
            </a>
          </div>
          <span className="mt-1.5 text-sm font-medium text-slate-400">
            {format(new Date(analysis.analysis_date), "dd.MM.yyyy")}
          </span>
        </div>
      </div>
      {analysis.diagnosis && (
        <div className="container mb-6">
          <h4 className="text-lg font-semibold">Диагноз:</h4>
          <p className="text-sm text-slate-700">
            {analysis.diagnosis || "Не указано"}
          </p>
        </div>
      )}
      <div>
        {analysis.quantitative_analysis_entries.map((entry, i) => (
          <AnalysisRowAccordion key={i} entry={entry} />
        ))}
      </div>
    </Layout>
  );
};

const AnalysisRowAccordion: React.FC<{
  entry: GetAnalysisResponse["quantitative_analysis_entries"][0];
}> = ({ entry }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="container">
          <div className="flex w-full flex-row justify-between text-sm font-medium">
            <div className="flex w-full flex-row items-center space-x-3">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  entry.diagnosis ? "bg-rose-700" : "bg-green-700",
                )}
              />
              <span className="line-clamp-2 text-left">{entry.name}</span>
            </div>
            <div className="flex flex-row flex-nowrap space-x-2.5">
              <div className="whitespace-nowrap">
                {entry.value} {entry.unit}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="container">
          <div className="mb-5 flex flex-row items-center justify-between">
            <Badge
              variant={entry.diagnosis ? "destructive" : "success"}
              size={"sm"}
            >
              {entry.diagnosis ? "Отклонение" : "Норма"}
            </Badge>
          </div>
          <p>{entry.diagnosis}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

AnalysisByIdPage.layout = {
  enabled: false,
  useContainer: false,
  variant: "panel",
};

export default AnalysisByIdPage;
