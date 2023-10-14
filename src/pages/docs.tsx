import type { NextPage } from "next";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/utils";
import { Badge } from "@/components/ui/badge";

const AnalysisPage: NextPage = () => {
  return (
    <>
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Документы</h1>
        <Button className={"h-10 w-10"} variant={"default"} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <Tabs defaultValue="docs" className="mt-4">
        <TabsList>
          <TabsTrigger value="docs">Справки</TabsTrigger>
          <TabsTrigger value="vaccination">Вакцинация</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <div className="flex flex-col">
            {Array.from({ length: 10 }).map((_, i) => (
              <DocumentPreviewItem status="active" key={i} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="vaccination">
          <div className="flex flex-col">
            {Array.from({ length: 10 }).map((_, i) => (
              <DocumentPreviewItem status="expired" key={i} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

const DocumentPreviewItem: React.FC<{
  status: "active" | "expired";
}> = ({ status }) => {
  return (
    <div className="flex flex-row space-x-5 border-b-2 py-4">
      <div>
        <div className="h-16 w-16 rounded-xs bg-gray-500" />
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">
            Справка о прививке
          </h3>
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

export default AnalysisPage;
