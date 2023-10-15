import { FileIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { CustomNextPage } from "@/types";
import { WithDivider } from "@/components/with-divider";
import {
  type DocumentItem,
  useDocumentsInfiniteQuery,
} from "@/hooks/query/documents/get-documents-query";
import { format } from "date-fns";
import { useVaccInfiniteQuery } from "@/hooks/query/documents/get-vacc-query";
import Link from "next/link";

const AnalysisPage: CustomNextPage = () => {
  return (
    <>
      <div className="container mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Документы</h1>
      </div>
      <Tabs defaultValue="docs" className="mt-4">
        <div className="container">
          <TabsList>
            <TabsTrigger value="docs">Справки</TabsTrigger>
            <TabsTrigger value="vaccination">Вакцинация</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="docs">
          <DocsContent />
        </TabsContent>

        <TabsContent value="vaccination">
          <VaccContent />
        </TabsContent>
      </Tabs>
    </>
  );
};

const DocsContent: React.FC = () => {
  const { data, isLoading } = useDocumentsInfiniteQuery();

  if (isLoading) {
    return <div className="container">Загрузка...</div>;
  }

  if (!data?.pages[0]?.results?.length) {
    return <div className="container">Нет документов</div>;
  }

  return (
    <WithDivider>
      {data.pages.flatMap((page) =>
        page.results.map((doc, i) => {
          return (
            <Link
              href={`/docs/certificates/${doc.id}`}
              className="container block"
              key={i}
            >
              <DocumentPreviewItem doc={doc} key={i} />
            </Link>
          );
        }),
      )}
    </WithDivider>
  );
};

const VaccContent: React.FC = () => {
  const { data, isLoading } = useVaccInfiniteQuery();
  if (isLoading) {
    return <div className="container">Загрузка...</div>;
  }

  if (!data?.pages[0]?.results?.length) {
    return <div className="container">Нет документов</div>;
  }

  return (
    <WithDivider>
      {data.pages.flatMap((page) =>
        page.results.map((doc, i) => (
          <Link
            href={`/docs/vaccines/${doc.id}`}
            className="container block"
            key={i}
          >
            <DocumentPreviewItem doc={doc} key={i} />
          </Link>
        )),
      )}
    </WithDivider>
  );
};

const DocumentPreviewItem: React.FC<{
  doc: DocumentItem;
}> = ({ doc }) => {
  return (
    <div className="flex flex-row space-x-5 py-4">
      <div>
        <div className="relative h-16 w-16">
          {doc.display_image ? (
            <img className="h-16 w-16 rounded-xs object-cover" src={doc.file} />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xs bg-slate-100">
              <FileIcon />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">{doc.title}</h3>
          {doc.expired ? (
            <Badge className="uppercase" variant={"destructive"}>
              Просрочена
            </Badge>
          ) : (
            <Badge className="uppercase" variant={"success"}>
              Активна
            </Badge>
          )}
        </div>
        <div>
          <p>
            Дата выдачи: {format(new Date(doc.received_date), "dd.MM.yyyy")}
          </p>
          <p>{doc.given_by.title}</p>
        </div>
      </div>
    </div>
  );
};

AnalysisPage.layout = {
  useContainer: false,
};

export default AnalysisPage;
