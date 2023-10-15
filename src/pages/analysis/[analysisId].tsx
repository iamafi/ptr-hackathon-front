import { DownloadIcon } from "lucide-react";

import type { CustomNextPage } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const AnalysisByIdPage: CustomNextPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col items-center space-y-4">
        {/* Image placeholder */}
        <div className="h-28 w-44 rounded-xs bg-gray-300" />
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center space-x-2.5">
            <span className="text-sm font-medium">Анализы Кендис Н. Ф.</span>
            <a className="text-rose-700">
              <DownloadIcon size={16} />
            </a>
          </div>
          <span className="text-sm font-medium text-slate-400 mt-1.5">
            {Intl.DateTimeFormat("ru-RU", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(new Date())}
          </span>
        </div>
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <AnalysisRowAccordion key={i} />
        ))}
      </div>
    </>
  );
};

const AnalysisRowAccordion: React.FC = ({}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="container">
          <div className="flex w-full flex-row justify-between text-sm font-medium">
            <div className="flex flex-row items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-rose-700" />
              <span>Магний</span>
            </div>
            <div className="space-x-2.5">
              <span>4.9 л/моль</span>
              <span className="text-slate-400">{"<"} 10.0</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="container">
          <div className="mb-5 flex flex-row items-center justify-between">
            <Badge variant={"destructive"} size={"sm"}>
              Отклонение
            </Badge>
            <span className="text-slate-400 text-sm">Норма: {"<"}10.0 г/моль</span>
          </div>
          <p>
            Магний – биологически активный минерал, жизненно важный для нашего
            организма. Он принимает участие в процессах выработки энергии,
            ферментной, мышечной и нервной деятельности, гликолизе, синтезе
            нуклеиновых кислот и пр.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

AnalysisByIdPage.layout = {
  useContainer: false,
  variant: "panel",
  title: "Для эндокринолога",
};

export default AnalysisByIdPage;
