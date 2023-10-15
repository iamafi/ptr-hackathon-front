import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { CustomNextPage } from "@/types";
import { WithDivider } from "@/components/with-divider";
import { useDocumentsInfiniteQuery } from "@/hooks/query/documents/get-documents-query";

const AnalysisPage: CustomNextPage = () => {
  return (
    <>
      <div className="container mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Документы</h1>
        <Button className={"h-10 w-10"} variant={"default"} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <Tabs defaultValue="docs" className="mt-4">
        <div className="container">
          <TabsList>
            <TabsTrigger value="docs">Справки</TabsTrigger>
            <TabsTrigger value="vaccination">Вакцинация</TabsTrigger>
          </TabsList>
        </div>
        <DocumentsListTabs />
      </Tabs>
    </>
  );
};

const DocumentsListTabs: React.FC = () => {
  const { data, isLoading } = useDocumentsInfiniteQuery();

  if (isLoading) {
    return <div className="container">Загрузка...</div>;
  }

  if (!data?.pages[0]?.results?.length) {
    return <div className="container">Нет документов</div>;
  }

  return (
    <>
      <TabsContent value="docs">
        <WithDivider>
          {data.pages.flatMap((page) =>
            page.results.map((_, i) => (
              <div className="container" key={i}>
                <DocumentPreviewItem status="active" key={i} />
              </div>
            )),
          )}
        </WithDivider>
      </TabsContent>
      <TabsContent value="vaccination">
        <WithDivider>
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="container" key={i}>
              <DocumentPreviewItem status="expired" key={i} />
            </div>
          ))}
        </WithDivider>
      </TabsContent>
    </>
  );
};

const DocumentPreviewItem: React.FC<{
  status: "active" | "expired";
}> = ({ status }) => {
  return (
    <div className="flex flex-row space-x-5 py-4">
      <div>
        <div className="h-16 w-16 rounded-xs bg-gray-500" />
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Справка о прививке</h3>
          {status === "expired" && (
            <Badge className="uppercase" variant={"destructive"}>
              Просрочена
            </Badge>
          )}
          {status === "active" && (
            <Badge className="uppercase" variant={"success"}>
              Активна
            </Badge>
          )}
        </div>
        <div>
          <p>Дата выдачи: 12.12.2021</p>
          <p>Справка о прививке от коронавируса</p>
        </div>
      </div>
    </div>
  );
};

AnalysisPage.layout = {
  useContainer: false,
};

export default AnalysisPage;
