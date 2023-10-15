import type { NextPage } from "next";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PlannerPage: NextPage = () => {
  return (
    <>
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Планер</h1>
      </div>
      <div>
        <Input placeholder="Поиск записей и привемов" />
      </div>
    </>
  );
};

export default PlannerPage;
