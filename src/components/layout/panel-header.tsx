import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import { useRouter } from "next/router";

export type PanelHeaderProps = {
  title?: string;
  onBack?: () => void;
  actions?: unknown;
};

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  onBack,
  actions,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    onBack?.() ?? router.back();
  };

  const handleActionsClick = () => {
    alert("Actions, TBD");
  };

  return (
    <div className="flex h-16 flex-row justify-between items-center px-5 py-3">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="h-6 w-6"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon size={24} />
      </Button>
      {title && <h1 className="font-semibold text-base">{title}</h1>}
      <Button
        variant={"ghost"}
        size={"icon"}
        className="h-6 w-6"
        onClick={handleActionsClick}
      >
        <MoreVerticalIcon size={24} />
      </Button>
    </div>
  );
};
