import type { NextPage } from "next";
import { FilterIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const AnalysisPage: NextPage = () => {
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
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <AnalysisCard key={i} />
        ))}
      </div>
    </>
  );
};

const AnalysisCard: React.FC = () => {
  return (
    <Link
      href={"/analysis/someId"}
      className="rounded-sm border border-slate-100 p-4"
    >
      <div className="mb-8 flex flex-row flex-wrap gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Badge key={i}>Флюрография</Badge>
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-bold">Флюрография</h3>
          <p className="text-sm font-normal">Снимок</p>
        </div>
        <div className="h-12 w-16 rounded-xs bg-gray-500" />
      </div>
    </Link>
  );
};

export default AnalysisPage;
