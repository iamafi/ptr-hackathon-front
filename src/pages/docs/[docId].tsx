import { DownloadIcon } from "lucide-react";

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

const DocsByIdPage: CustomNextPage = () => {
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
    <>
      <div className="mb-6 flex flex-col items-center space-y-4">
        {/* Image placeholder */}
        <div className="relative h-28 w-44">
          <Image
            alt={`${analysis.name} ${analysis.type}`}
            className="rounded-xs object-cover"
            fill
            src={analysis.file}
          />
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
      <div>
        {analysis.quantitative_analysis_entries.length === 0 && (
          <div className="container">Нет амбулаторных показателей</div>
        )}
        {analysis.quantitative_analysis_entries.map((entry, i) => (
          <AnalysisRowAccordion key={i} entry={entry} />
        ))}
      </div>
    </>
  );
};


DocsByIdPage.layout = {
  useContainer: false,
  variant: "panel",
  title: "Для эндокринолога",
};

export default DocsByIdPage;
