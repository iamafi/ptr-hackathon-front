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
    <div className="container sticky top-0 flex h-16 flex-row items-center justify-between bg-background/90 py-3 backdrop-blur-lg">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="h-6 w-6"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon size={24} />
      </Button>
      {title && <h1 className="text-base font-semibold">{title}</h1>}
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
