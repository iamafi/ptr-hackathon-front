import { FilterIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CustomNextPage } from "@/components/types";

const AnalysisByIdPage: CustomNextPage = () => {
  return (
    <>
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Мои анализы</h1>
        <Button className={"h-10 w-10"} variant={"default"} size={"icon"}>
          <PlusIcon />
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
    </>
  );
};

AnalysisByIdPage.layout = {
  variant: "panel",
  title: "Для эндокринолога"
};

export default AnalysisByIdPage;
