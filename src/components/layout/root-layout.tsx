import Head from "next/head";

import { Navbar } from "@/components/layout/navbar";
import { PanelHeader } from "@/components/layout/panel-header";
import type { PanelHeaderProps } from "@/components/layout/panel-header";
import { cn } from "@/utils";

type LayoutVariantProps =
  | {
      variant?: "default";
    }
  | ({
      variant: "panel";
    } & PanelHeaderProps);

export type LayoutProps = {
  useContainer?: boolean;
} & LayoutVariantProps;

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  variant = "default",
  useContainer = true,
  ...props
}) => {
  return (
    <>
      <Head>
        <title>Ramenstein theorem</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full min-h-[100svh] flex-col">
        {variant === "panel" && <PanelHeader {...props} />}
        <div
          className={cn(
            "flex-1 py-5",
            useContainer && "container",
            variant === "panel" && "pt-4",
          )}
        >
          {children}
        </div>
        {variant === "default" && <Navbar />}
      </main>
    </>
  );
};
