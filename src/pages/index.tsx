import { CloudSunIcon, FileHeartIcon, FolderHeartIcon, HeartPulse, LocateFixedIcon } from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="mb-1 text-3xl font-bold">Добро пожаловать!</h1>
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
      <h1 className="pb-4 pt-8 text-xl font-semibold">Инструменты</h1>
      <div className="flex flex-row gap-4">
        <div className="rounded-sm bg-red-500 p-4">
          <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-xs bg-white">
            <FolderHeartIcon className="text-red-700" size={20} />
          </div>
          <span className="text-white">Динамика показателей</span>
        </div>
        <div className="rounded-sm bg-yellow-500 p-4">
          <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-xs bg-white">
            <FileHeartIcon className="text-yellow-700" size={20} />
          </div>
          <span className="text-white">Создать отчет для врача</span>
        </div>
      </div>
      <Link href={"/analysis/submit"} className="mt-4 flex flex-row items-center gap-5 rounded-sm bg-teal-500 p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xs bg-white">
          <HeartPulse className="text-teal-700" size={20} />
        </div>
        <span className="text-white">Загрузить снимок/анализы</span>
      </Link>
    </>
  );
};

export default Home;
