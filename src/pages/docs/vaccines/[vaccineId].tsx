import { DownloadIcon, FileIcon, VerifiedIcon } from "lucide-react";

import type { CustomNextPage } from "@/types";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVaccineByIdQuery } from "@/hooks/query/documents/get-vaccine-by-id-query";

const VaccineByIdPage: CustomNextPage = () => {
  const router = useRouter();
  const vaccineId = router.query.vaccineId as string;

  const { data: vaccine, isLoading } = useVaccineByIdQuery({
    queryKey: ["vaccines", vaccineId],
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!vaccine) {
    return <div>Документ не найден</div>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col items-center space-y-4">
        <div className="relative h-28 w-44">
          {vaccine.display_image !== false ? (
            <Image
              alt={`${vaccine.id}-${vaccine.type}`}
              className="rounded-xs object-cover"
              fill
              src={vaccine.file}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <FileIcon className="h-8 w-8 text-slate-400" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center space-x-2.5">
            <span className="text-sm font-medium">{vaccine.title}</span>
            <a
              className="text-rose-700"
              href={vaccine.file}
              download
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon size={16} />
            </a>
          </div>
          <span className="mt-1.5 text-sm font-medium text-slate-400">
            {format(new Date(vaccine.created_date), "dd.MM.yyyy")}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="received_date">Дата получения</Label>
          <div className="relative">
            <Input
              className="w-full"
              id="received_date"
              value={format(new Date(vaccine.received_date), "dd.MM.yyyy")}
            />
            <VerifiedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-green-600"
              size={20}
            />
          </div>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="received_date">Дата получения</Label>
          <div className="relative">
            <Input
              className="w-full"
              id="received_date"
              value={format(new Date(vaccine.received_date), "dd.MM.yyyy")}
            />
            <VerifiedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-green-600"
              size={20}
            />
          </div>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="received_date">Срок годности</Label>
          <div className="relative">
            <Input
              className="w-full"
              id="received_date"
              value={`до ${format(
                new Date(vaccine.expiration_date),
                "dd.MM.yyyy",
              )}`}
            />
            <VerifiedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-green-600"
              size={20}
            />
          </div>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="received_date">Медецинское учреждение</Label>
          <div className="relative">
            <Input
              className="w-full"
              id="received_date"
              value={vaccine.given_by.title}
            />
            <VerifiedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-green-600"
              size={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

VaccineByIdPage.layout = {
  variant: "panel",
};

export default VaccineByIdPage;
