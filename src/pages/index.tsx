import { CloudSunIcon, LocateFixedIcon } from "lucide-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Добро пожаловать!</h1>
      <p className="mb-8">Дайджест вашего здоровья на сегодня:</p>
      <div className="flex rounded-sm border border-slate-100 px-4 py-5">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sm">г. Ташкент</span>
              <LocateFixedIcon className="h-4 w-4" />
            </div>
            <div className="mt-3 flex flex-row items-end gap-2.5">
              <span className="text-3xl font-bold text-slate-700">14°C</span>
              <span className="text-lg font-medium">облачно</span>
            </div>
          </div>
          <CloudSunIcon className="h-[66px] w-[66px] text-slate-400" />
        </div>
      </div>
      <h1 className="pb-6 pt-8">Инструменты</h1>
    </>
  );
};

export default Home;
