import Link from "next/link";
import { useRouter } from "next/router";
import {
  CalendarHeartIcon,
  FileHeartIcon,
  HeartPulseIcon,
  HomeIcon,
  UserIcon,
} from "lucide-react";

import { cn } from "@/utils";

export const Navbar = () => {
  return (
    <div className="container sticky inset-x-0 bottom-0 flex flex-row items-center justify-between rounded-2xl bg-background/90 pb-3 pt-4 shadow-navbar backdrop-blur-lg">
      <NavbarButton title="Home" href="/" icon={<HomeIcon />} />
      <NavbarButton title="Анализ" href="/analysis" icon={<HeartPulseIcon />} />
      <NavbarButton
        title="Планер"
        href="/planner"
        icon={<CalendarHeartIcon />}
      />
      <NavbarButton title="Документы" href="/docs" icon={<FileHeartIcon />} />
      <NavbarButton title="Профиль" href="/profile" icon={<UserIcon />} />
    </div>
  );
};

const NavbarButton: React.FC<{
  title: string;
  href: string;
  icon: React.ReactNode;
}> = ({ href, icon, title }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      className={cn(
        "flex w-[3.375rem] flex-col items-center justify-center space-y-1.5 text-slate-300",
        isActive && "text-primary",
      )}
      href={href}
    >
      {icon}
      <span className="text-xs font-bold">{title}</span>
    </Link>
  );
};
